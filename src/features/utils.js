
export function getParse() {
    const Parse = require('parse/node');
    Parse.serverURL = 'https://parseapi.back4app.com'; 
    Parse.initialize(
        '2fZz5RyRcZPfHNZEiNMPIh5G58NGf7IY3yEiVuBO', // Application ID
        'olcTzBH0bGZ2tkrkg3mAdmc8KmC7xIswyIXFdsc4', // This is your Javascript key
    );        
    return Parse
}