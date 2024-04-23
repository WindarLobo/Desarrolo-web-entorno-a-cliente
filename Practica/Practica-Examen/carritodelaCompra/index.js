$(document).ready(function () {
    let usuarioLogin = false;
    let miCesta = [];

    let listaProductos = [
        { nombre : "Leche", descripcion : "Producto lacteo", precio : 2.50},
        { nombre : "Pan", descripcion : "Producto de panaderia", precio : 1.00},
        { nombre : "Arroz", descripcion : "Cereal", precio : 3.50},
        { nombre : "Huevos", descripcion : "Producto de gallina", precio : 2.00},
        { nombre : "Azucar", descripcion : "Endulzante", precio : 2.75},
        { nombre : "Cafe", descripcion : "Producto de cafeina", precio : 4.20},
        { nombre : "Aceite", descripcion : "Producto de cocina", precio : 5.30},
        { nombre : "Sal", descripcion : "Condimento", precio : 1.50},
        { nombre  : "Pasta", descripcion : "Producto de trigo", precio : 2.80},
        { nombre : "Atun", descripcion : "Producto de pescado", precio : 1.75}
    ]

    localStorage.setItem('productos', JSON.stringify(listaProductos));

    let productos = [];
    productos = JSON.parse(localStorage.getItem('productos'));

    productos.forEach(producto => {
        $('.productos').append(
            `<h4>${producto.nombre}</h4> <p>${producto.descripcion}</p> <small>${producto.precio}</small><button class="addProducto">Añadir a Cesta</button>`
        );
    });

    function validarNombre() {  
        let txtNombre = $('#txtNombre').val();
        if(txtNombre === undefined || txtNombre === '') return false; $('.errores').append('Nombre mal escrito');
        return true;
    }

    function validarContrasenha() {  
        let txtContrasenha = $('#txtContrasenha').val();
        if(txtContrasenha === undefined || txtContrasenha === '') return false; $('.errores').append('Contrasenha no válida');
        return true;
    }

    function validarUsuario() {  
        let nombreVal = validarNombre();
        let txtContrasenha = validarContrasenha();
        if(nombreVal && txtContrasenha){
            $('.errores').empty();
            return true;  
        }
        return false;
    }

    $('#btnSesion').click(function (e) { 
        let validaUsuario = validarUsuario();
        if(validaUsuario){
            $('#usuario').append($('#txtNombre').val());
            $('h3').css('display', 'flex');
            usuarioLogin = true;
        }
    });
    
    $('.addProducto').click(function (e) {
        if(usuarioLogin){
            alert('Introducido a la cesta');
            miCesta.push({
                nombreUsuario : $('#usuario').text(),
                nombreProducto : $(this).prevAll('h4').first().text(),
                descripcionProducto : $(this).prevAll('p').first().text(),
                precioProducto : $(this).prevAll('small').first().text(),
            });
            localStorage.setItem('miCesta', JSON.stringify(miCesta));
        } else {
            alert('necesitas loguearte para registrar productos en tu cesta')
        }
    });
    
    function mostrarCesta(){
        $(miCesta).empty();
        miCesta = JSON.parse(localStorage.getItem('miCesta')) || [];
        if(miCesta.length <= 0 || miCesta === null){
            $('.cesta').empty();
            $('.cesta').append(`Tienes ${miCesta.length} productos añadidos`);
        } else {
            miCesta.forEach(cesta => {
                $('.cesta').append(
                    `<h4>${cesta.nombreProducto}</h4> <p>${cesta.descripcionProducto}</p> <small>${cesta.precioProducto}</small> <button class="delProducto">Eliminar de la Cesta</button>`
                );
            });
        }
    }

    $('.cesta').on('click', '.delProducto', function() {
        let index = $(this).closest('.cesta').find('.delProducto').index($(this)); // Obtener el índice del producto a eliminar
        miCesta.splice(index, 1); // Eliminar la cesa
        localStorage.setItem('miCesta', JSON.stringify(miCesta));
        mostrarCesta();
    });

    mostrarCesta();
});