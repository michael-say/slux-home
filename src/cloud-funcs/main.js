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