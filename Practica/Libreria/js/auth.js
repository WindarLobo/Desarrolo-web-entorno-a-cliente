$(document).ready(function () {
    let usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];

    function addAdmin() {  
        let encontrarUsuario = usuariosRegistrados.find(user => user.nombre ===  'Admin');
        if(!encontrarUsuario){
            let usuarioporDefecto = { nombre : 'Admin', contrasenha : 'root', admin : true}
            usuariosRegistrados.push(usuarioporDefecto);
            localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));
        }
    }
    
    addAdmin();

    $('#registro').click(function (e) { 
        $('.login').css('display', 'none');
        $('.registro').css('display', 'block');        
    });

    $('#login').click(function (e) { 
        $('.registro').css('display', 'none');
        $('.login').css('display', 'block');        
    });

    // Registro de Usuarios
    function validarRegisterUsuario() {  
        let txtNombre = $('#txtRegisterUsuario').val();
        if(txtNombre === '' || txtNombre === undefined || txtNombre === null){
            $('#erroresRegistro').append(`<li>Nombre mal escrito</li>`);
            return false;
        } 
        return true;
    }

    function validarRegisterContrasenha() {  
        let txtContrasenha = $('#txtRegisterContrasenha').val();
        if(txtContrasenha === '' || txtContrasenha === undefined || txtContrasenha === null){
            $('#erroresRegistro').append(`<li>Contraseña mal escrita</li>`);
            return false;
        } 
        return true;
    }

    function validarRegisterDNI() {  
        let txtDNI = $('#txtRegisterDNI').val();
        if(txtDNI === '' || txtDNI === undefined || txtDNI === null){
            $('#erroresRegistro').append(`<li>DNI Introducido o mal escrito</li>`);
            return false;
        }
        return true;
    }

    function valRegisterUsuario() {  
        $('#errores').text('');
        let txtRegisterUsuario = validarRegisterUsuario();
        let txtRegisterContrasenha = validarRegisterContrasenha();
        let txtRegisterDNI = validarRegisterDNI();
        if(txtRegisterUsuario && txtRegisterContrasenha && txtRegisterDNI) return true;
    }


    $('#addUsuario').click(function (e) {
        if(valRegisterUsuario()){
            $('#errores').text('');
            let usuarios = {nombre : $('#txtRegisterUsuario').val(), contrasenha : $('#txtRegisterContrasenha').val(), dni : $('#txtRegisterDNI').val(), admin : false}
            usuariosRegistrados.push(usuarios);
            localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));
            $('.login').css('display', 'none');
            $('.registro').css('display', 'block');
            window.location.href = 'auth.html'
        }
    });

    // Inicio de Usuarios
    function validarLoginUsuario() {  
        let txtNombre = $('#txtLoginUsuario').val();
        if(txtNombre === '' || txtNombre === undefined || txtNombre === null){
            $('#erroresLogin').append(`<li>Nombre mal escrito</li>`);
            return false;
        } 
        return true;
    }

    function validarLoginContrasenha() {  
        let txtContrasenha = $('#txtLoginContrasenha').val();
        if(txtContrasenha === '' || txtContrasenha === undefined || txtContrasenha === null){
            $('#erroresLogin').append(`<li>Contraseña mal escrita</li>`);
            return false;
        } 
        return true;
    }
    
    function comprobarUsuario() {  
        let encontrarUsuario = usuariosRegistrados.find(user => user.nombre ===  $('#txtLoginUsuario').val() && user.contrasenha === $('#txtLoginContrasenha').val());
        if(!encontrarUsuario) return false;
        return true;
    }

    function valLoginUsuario() {  
        $('#erroresLogin').text('');
        let txtLoginUsuario = validarLoginUsuario();
        let txtLoginContrasenha = validarLoginContrasenha();
        let valUsuario = comprobarUsuario();
        if(txtLoginUsuario && txtLoginContrasenha && valUsuario) return true;
    }

    $('#authUsuario').click(function (e) { 
        if(valLoginUsuario()){
            $('#errores').text('');
            let usuarioActual = {nombre : $('#txtLoginUsuario').val(), contrasenha : $('#txtLoginContrasenha').val(), admin : false ,cesta : []}
            localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));
            window.location.href = 'libreria.html'
        }
    });
});