const http = require('http');
const handleRequest = (request, res) => {


    if (request.method === 'GET' && request.url === '/crear-usuario') {
        res.end(crear_usuario("mariel"));

    }
    else if (request.method === 'POST' && request.url === '/autenticacion') {
        let body = '';
        // Recibir los datos de la solicitud
        request.on('data', chunk => {
            body += chunk;

        });
        request.on('end', () => {
            try {
                // Parsear los datos JSON
                const data = JSON.parse(body);
                const { pasword,user } = data;

                // Validar los datos
                if (!user || !pasword) {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: 'Nombre y contraseña son requeridos' }));
                    return;
                }

                // Responder con un mensaje
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(autenticacion(pasword,user));
            } catch (error) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Datos mal formados' }));
            }
        });
    }
    else {
        // Si no es una solicitud POST a la ruta correcta
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
    }
    //response.end('404 Page not found');
};


const server = http.createServer(handleRequest);
const port = 9000;


server.listen(port, () => {
    console.log(`Server running at <http://localhost>:${port}`);
});

function crear_usuario(nombre) {
    impresion_logs("Este es un log");
}

function impresion_logs(logs) {
    console.info(logs);
}


function autenticacion(pasword,user) {
    let obj_user = ob_autenticacion();
    let resultado="";
    
    if (pasword == obj_user.pasword && user == obj_user.user) {

        resultado=JSON.stringify({
            mensaje: `Autentiacion correcta.`, 
            estatus:'Oks',
        });
    } else{
        resultado=JSON.stringify({
            mensaje: `Credenciales incorrectos`,
            estatus:'error',
        });
    }
    return resultado;
} 

function ob_autenticacion() {
    let user = "Admin";
    let pasword = "2503"
    let obj_user = {
        "user": user,
        "pasword": pasword

    }
    return obj_user;
}


