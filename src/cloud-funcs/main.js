Parse.Cloud.define("addspace", async (request) => {
    if (!request.user) {
        throw 'Unauthorized';
    }

    if (!request.params.name || request.params.name == "") {
        throw 'Name is required';
    }

    var user = request.user;

    const query = new Parse.Query('workspace');
    query.equalTo("creator", user);

    const count = await query.count({useMasterKey:true});

    if (count > 5)
      throw 'Workspace number is limited to 5';

    // Create workspace row

    const workspace = Parse.Object.extend('workspace');
    const myNewObject = new workspace();      
    myNewObject.set('name', request.params.name);
    myNewObject.set('creator', user);
    newWorkspace = await myNewObject.save(null, {useMasterKey:true, sessionToken: request.user.getSessionToken()});

    // Creating new role
    var roleName = "wrk_" + newWorkspace.id;
    var roleAcl = new Parse.ACL();
    var newRole = new Parse.Role(roleName, roleAcl);
    roleAcl.setRoleReadAccess(newRole, true); //give read access to Role
    newRole.getUsers().add(user);
    savedRole = await newRole.save(null, {useMasterKey:true, sessionToken: request.user.getSessionToken()});

    var acl = new Parse.ACL();
    acl.setRoleReadAccess(savedRole, true); //give read access to Role
    acl.setWriteAccess(user, true); //give write access to Role

    newWorkspace.setACL(acl);
    await newWorkspace.save(null, {useMasterKey:true, sessionToken: request.user.getSessionToken()});

    const WorkspaceUser = Parse.Object.extend('WorkspaceUser');
    const membership = new WorkspaceUser();
    membership.set('Workspace', newWorkspace);
    membership.set('User', user);
    membership.set('ACL', acl);
    await membership.save(null, {useMasterKey:true, sessionToken: request.user.getSessionToken()});

    // Create root channel
    const Channel = Parse.Object.extend('Channel');
    const chan = new Channel();      
    chan.set('name', "root");
    chan.set('creator', user);
    chan.set('workspace', newWorkspace);
    chan.set('ACL', acl);
    await chan.save(null, {useMasterKey:true, sessionToken: request.user.getSessionToken()});


    return(newWorkspace.id);

});

Parse.Cloud.define("addchannel", async (request) => {
    if (!request.user) {
        throw 'Unauthorized';
    }

    if (!request.params.name || request.params.name == "") {
        throw 'Name is required';
    }

    if (!request.params.wid || request.params.wid == "") {
        throw 'wid is required';
    }

    var user = request.user;

    const Workspace = Parse.Object.extend('workspace');
    const workspace = new Workspace();
    workspace.set("id", request.params.wid);

    var wrkrole = new Parse.Role("wrk_" + request.params.wid, new Parse.ACL());
    var acl = new Parse.ACL();
    acl.setRoleReadAccess(wrkrole, true); //give read access to Role
    acl.setWriteAccess(user, true); //give write access to Role

    // Create root channel
    const Channel = Parse.Object.extend('Channel');
    const chan = new Channel();      
    chan.set('name', request.params.name);
    chan.set('creator', user);
    chan.set('workspace', workspace);
    chan.set('ACL', acl);
    await chan.save(null, {useMasterKey:true, sessionToken: request.user.getSessionToken()});


    return(chan.id);

});

Parse.Cloud.define("addmember", async (request) => {
    if (!request.user) {
        throw 'Unauthorized';
    }

    if (!request.params.email || request.params.email == "") {
        throw 'email is required';
    }

    if (!request.params.wid || request.params.wid == "") {
        throw 'wid is required';
    }

    const qUser = new Parse.Query(Parse.User);
    qUser.equalTo("email", request.params.email);
    const user = await qUser.first({useMasterKey:true});
    if (!user) {
        throw 'User not found';
    }

    const query = new Parse.Query(Parse.Role);
    query.equalTo("name", "wrk_" + request.params.wid);
    const role = await query.first({useMasterKey:true, sessionToken: request.user.getSessionToken()});
    if (!role) {
        throw 'Role not found';
    }
    role.getUsers().add(user);
    await role.save(null, {useMasterKey:true, sessionToken: request.user.getSessionToken()});

    var wrkrole = new Parse.Role("wrk_" + request.params.wid, new Parse.ACL());
    var acl = new Parse.ACL();
    acl.setRoleReadAccess(wrkrole, true); 
    acl.setRoleWriteAccess(wrkrole, true);    

    const Workspace = Parse.Object.extend('workspace');
    const workspace = new Workspace();
    workspace.set("id", request.params.wid);

    const WorkspaceUser = Parse.Object.extend('WorkspaceUser');
    const membership = new WorkspaceUser();
    membership.set('Workspace', workspace);
    membership.set('User', user);
    membership.set('ACL', acl);
    await membership.save(null, {useMasterKey:true, sessionToken: request.user.getSessionToken()});


    return;
});


Parse.Cloud.define("post", async (request) => {
    if (!request.user) {
        throw 'Unauthorized';
    }

    if (!request.params.message || request.params.message == "") {
        throw 'message is required';
    }

    if (!request.params.channelId || request.params.channelId == "") {
        throw 'channelId is required';
    }

    if (!request.params.wid || request.params.wid == "") {
        throw 'wid is required';
    }
    
    var user = request.user;

    // TODO: validate if user is a member of workspace
    // TODO: validate if channel belongs to workspace

    const Channel = Parse.Object.extend('Channel');
    const channel = new Channel();
    channel.set("id", request.params.channelId);

    var wrkrole = new Parse.Role("wrk_" + request.params.wid, new Parse.ACL());
    var acl = new Parse.ACL();
    acl.setRoleReadAccess(wrkrole, true); //give read access to Role
    acl.setWriteAccess(user, true); //give write access to Role

    const Posts = Parse.Object.extend('Posts');
    const post = new Posts();
    post.set('Channel', channel);
    post.set('Message', request.params.message);
    post.set('Author', user);
    post.set('ACL', acl);
    post.set('Date', new Date());
    await post.save(null, {useMasterKey:true, sessionToken: request.user.getSessionToken()});
    
    return;
});

