$(document).ready(function () {
    let usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));

    if(usuarioActual){
        $('h1').append(`Bievenido ${usuarioActual.nombre}`);
    } else {
        window.location.href = 'auth.html'
    }
    
    let libros = [
        {"nombre": "Cien años de soledad", "autor": "Gabriel García Márquez", "año": "1967 ", "ventas": "50 millones"},
        {"nombre": "El Señor de los Anillos","autor": "J.R.R. Tolkien","año": "1954","ventas": "150 millones"},
        {"nombre": "Don Quijote de la Mancha","autor": "Miguel de Cervantes","año": "1605","ventas": "500 millones"},
        {"nombre": "El Alquimista", "autor": "Paulo Coelho", "año": "1988", "ventas": "150 millones"},
        {"nombre": "Harry Potter y la Piedra Filosofal", "autor": "J.K. Rowling", "año": "1997", "ventas": "120 millones"},
        {"nombre": "1984", "autor": "George Orwell", "año": "1949", "ventas": "30 millones"},
        {"nombre": "El Principito", "autor": "Antoine de Saint-Exupéry", "año": "1943", "ventas": "140 millones"},
        {"nombre": "El Código Da Vinci","autor": "Dan Brown","año": "2003","ventas": "80 millones"},
        {"nombre": "Orgullo y Prejuicio", "autor": "Jane Austen", "año": "1813", "ventas": "50 millones"}
    ];
    
    if (localStorage.getItem('biblioteca')) {
        var librosRecuperar = JSON.parse(localStorage.getItem('biblioteca'));
    } else {
        var librosRecuperar = libros;
    }
    
    actualizarLibros();
    
    if(usuarioActual.nombre === 'Admin'){
        $('#modoAdmin').css('display', 'block');
        $('.eliminarAdminLibro').css('display', 'flex');
    }

    $('.addPrestamo').click(function (e) { 
        let libro = {
            nombreLibro : $(this).closest('.librosContainer').find('h3').text(),
            autorLibro : $(this).closest('.librosContainer').find('p').text(),
        }
        let usuarioActual = JSON.parse(localStorage.getItem('usuarioActual')) || { cesta: [] };
        usuarioActual.cesta.push(libro);
        localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));
        actualizarMostrarCesta(usuarioActual);
    });
    
    
    function actualizarMostrarCesta(usuarioActual){
        if(usuarioActual.cesta.length <= 0){
            $('#mostrarCesta').text(`Tienes ${usuarioActual.cesta.length} libros prestados`);
        } else {
            $('#mostrarCesta').empty();
            usuarioActual.cesta.forEach(libros => {
                $('#mostrarCesta').append(`<p>${libros.nombreLibro} - ${libros.autorLibro} <button class="eliminarLibro">Eliminar de la Cesta</button></p>`)
            });
        }
    }
    
    $(document).on('click', '.eliminarLibro', function() { 
        let indiceProducto = $(this).closest('p').index();
        let usuarioActual = JSON.parse(localStorage.getItem('usuarioActual')) || { cesta: [] };
        usuarioActual.cesta.splice(indiceProducto, 1);
        localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));
        actualizarMostrarCesta(usuarioActual);
    });

    actualizarMostrarCesta(usuarioActual);

    function valNombreLibro(){
        let nombreLibro = $('#txtNombreLibro').val();
        if(nombreLibro === '' || nombreLibro === undefined) return false;
        return true;
    }

    function valAutorLibro() {  
        let autorLibro = $('#txtAutorLibro').val();
        if(autorLibro === '' || autorLibro === undefined) return false;
        return true;
    }

    function valAnhoLibro() {  
        let anhoLibro = parseInt($('#txtAnhoLibro').val());
        if(anhoLibro === 0 || anhoLibro === undefined || anhoLibro === null) return false;
        return true;
    }

    function valCopiasLibro() {  
        let ventasLibro = $('#txtCopiasLibro').val();
        if(ventasLibro === 0 || ventasLibro === undefined) return false;
        return true;
    }

    function valLibro() {  
        let valNombre = valNombreLibro();
        let valAutor = valAutorLibro();
        let valAnho = valAnhoLibro();
        let valCopias = valCopiasLibro();

        if(valNombre && valAutor && valAnho && valCopias) return true;
        return false;
    }

    $('#modoAdmin').click(function (e) { 
        $('.formLibro').css('display', 'flex');
    });

    $('#addLibro').click(function (e) { 
        if(valLibro()){
            let nuevoLibro = {
                nombre : $('#txtNombreLibro').val(),
                autor : $('#txtAutorLibro').val(),
                año : parseInt($('#txtAnhoLibro').val()),
                ventas : `${parseInt($('#txtCopiasLibro').val())} millones`
            }
            librosRecuperar.push(nuevoLibro);
            localStorage.setItem('biblioteca', JSON.stringify(librosRecuperar));
            actualizarLibros();
        }        
    });

    $(document).on('click', '.eliminarAdminLibro', function() { 
        let indiceLibro = $(this).closest('p').index();
        let librosRecuperar = JSON.parse(localStorage.getItem('biblioteca')) || [];
        librosRecuperar.splice(indiceLibro, 1);
        localStorage.setItem('biblioteca', JSON.stringify(librosRecuperar));
        location.reload();
    });

    function actualizarLibros() {  
        $('.libros').empty();
        librosRecuperar.sort(((a, b) => b.año - a.año));
        librosRecuperar.forEach(libro => {
            $('.libros').append(`<div class="librosContainer" style="margin: 95px">
            <h3>${libro.nombre}</h3> <p>${libro.autor}</p> 
            <small>${libro.año} - Nº Venta: ${libro.ventas}</small>
            <div style="margin-top : 25px"><button class="addPrestamo">Agregar al préstamo</button><button class="eliminarAdminLibro" style="display: none; margin-top : 5px;">Eliminar de la Cesta</button></div>
            </div>`);
        });
    }
});
