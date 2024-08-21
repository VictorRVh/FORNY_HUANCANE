import jsPDF from "jspdf";
import "jspdf-autotable";

export function generateNominaPDF(data) {
  const doc = new jsPDF();

  doc.addImage(
    "img/logoMin.png",    // Fuente de la imagen
    "PNG",                // Formato de la imagen
    10,                   // Posición X (desde la izquierda)
    10,                   // Posición Y (desde arriba)
    40,                   // Ancho de la imagen
    15,                   // Alto de la imagen
    null,                 // Nombre opcional para el recurso de imagen (puede ser nulo)
    {                    // Opciones adicionales
      align: 'left',      // Alineación (si aplicable)
      rotation: 45        // Rotación en grados
    }
  );

  doc.addImage(
    "img/logoTwo.png",    // Fuente de la imagen
    "PNG",                // Formato de la imagen
    165,                   // Posición X (desde la izquierda)
    9,                   // Posición Y (desde arriba)
    25,                   // Ancho de la imagen
    18,                   // Alto de la imagen
    null,                 // Nombre opcional para el recurso de imagen (puede ser nulo)
    {                    // Opciones adicionales
      align: 'left',      // Alineación (si aplicable)
      rotation: 45        // Rotación en grados
    }
  );

  // Título
  // Cabecera
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("NÓMINA DE MATRÍCULA 2024", 105, 15, { align: "center" });
  doc.setFontSize(12);
  doc.text("EDUCACIÓN TÉCNICO PRODUCTIVA", 105, 22, { align: "center" });

  doc.autoTable({
    startY: 30,
    head: [],
    body: [
      [
        { content: "REGIÓN", styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: "LIMA", colSpan: 1, styles: { lineWidth: 0.25, lineColor: [0, 0, 0], halign: 'center' } },
        { content: "UGEL", styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: "06", colSpan: 1, styles: { lineWidth: 0.25, lineColor: [0, 0, 0], halign: 'center' } },
        { content: "CETPRO", styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: "VICTOR RAÚL HAYA DE LA TORRE", colSpan: 3, styles: { lineWidth: 0.25, lineColor: [0, 0, 0], halign: 'center' } },

      ],
      [
        { content: "GESTIÓN PÚBLICA", styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: "X", styles: { lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: "GESTIÓN PRIVADA", styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], lineWidth: 0.25, lineColor: [0, 0, 0] } },
        "",
        { content: "CONVENIO", styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], lineWidth: 0.25, lineColor: [0, 0, 0] } },
        "",
        { content: "CÓDIGO MODULAR", styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: "469452", colSpan: 1, styles: { lineWidth: 0.25, lineColor: [0, 0, 0], halign: 'center' } },
        ""
      ],
      [
        { content: "RESOLUCIÓN DE CREACIÓN", styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], lineWidth: 0.25, lineColor: [0, 0, 0] }, colSpan: 2 },
        { content: "RM N° 0194-1975 ED", colSpan: 2, styles: { lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: "RESOLUCIÓN DE CONVERSIÓN", styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], lineWidth: 0.25, lineColor: [0, 0, 0] }, colSpan: 3 },
        { content: "", colSpan: 1, styles: { lineWidth: 0.25, lineColor: [0, 0, 0] } }
      ],
      [
        { content: "PROVINCIA", styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: "LIMA", colSpan: 3, styles: { lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: "DISTRITO", styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], lineWidth: 0.25, lineColor: [0, 0, 0] }, colSpan: 2 },
        { content: "LIMA", colSpan: 2, styles: { lineWidth: 0.25, lineColor: [0, 0, 0] } },
        ""
      ],
      [
        { content: "LUGAR", styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: "ATE", colSpan: 2, styles: { lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: "DIRECCION", styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], lineWidth: 0.25, lineColor: [0, 0, 0] }, colSpan: 2 },
        { content: "Urbanización CERES II ETAPA", colSpan: 3, styles: { lineWidth: 0.25, lineColor: [0, 0, 0] } },
        ""
      ],
      [
        { content: "PROGRAMA DE ESTUDIOS", styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], lineWidth: 0.25, lineColor: [0, 0, 0] }, colSpan: 2 },
        { content: data.nombre_especialidad, colSpan: 6, styles: { halign: 'center', lineWidth: 0.25, lineColor: [0, 0, 0] } },
      ],
      [
        { content: "MÓDULO", styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: data.modulo_formativo, colSpan: 3, styles: { lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: "RESOLUCIÓN DIRECTORIAL", styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: "RD N° 07592-2024-UGEL", colSpan: 1, styles: { lineWidth: 0.25, lineColor: [0, 0, 0], halign: 'center' } },
        { content: "CICLO", styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: "AUXILIAR TÉCNICO", colSpan: 1, styles: { lineWidth: 0.25, lineColor: [0, 0, 0], halign: 'center' } },
        ""
      ],
      [
        { content: "FECHA DE INICIO", styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: data.fecha_inicio, colSpan: 1, styles: { lineWidth: 0.25, lineColor: [0, 0, 0], halign: 'center' } },
        { content: "FECHA DE TERMINO", styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: data.fecha_fin, colSpan: 1, styles: { lineWidth: 0.25, lineColor: [0, 0, 0], halign: 'center' } },
        { content: "TURNO", styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: data.turno || 'noche', colSpan: 1, styles: { lineWidth: 0.25, lineColor: [0, 0, 0], halign: 'center' } },
        { content: "SECCIÓN", styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: data.seccion, colSpan: 1, styles: { lineWidth: 0.25, lineColor: [0, 0, 0], halign: 'center' } },
        ""
      ],
    ],
    theme: 'plain',
    styles: {
      fontSize: 8,
      cellPadding: 2,
      halign: 'center',
      valign: 'middle'
    },
    margin: { top: 10, bottom: 10 },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { cellWidth: 'auto' },
    }
  });

  // Definir las columnas y los datos de la tabla
  const tableColumn = ["ID", "Código de Matrícula", "Apellidos y Nombres", "Sexo", "Fecha de Nacimiento", 'Condición (G-P-B)', "N° de Unidades Didácticas", "N° de Créditos"];

  const tableRows = data.estudiantes.map((estudiante, index) => {

    return [
      index + 1, // ID
      estudiante.codigo_matricula,
      estudiante.apellidos_nombres,
      estudiante.sexo,
      estudiante.fecha_nacimiento,
      estudiante.condicion,
      data.total_unidades_didacticas,
      data.suma_creditos
    ];
  });

  // Imprimir la tabla de estudiantes
  doc.autoTable({
    startY: doc.lastAutoTable.finalY,
    head: [tableColumn],
    body: tableRows,
    styles: {
      fontSize: 10,
      cellPadding: 1,
      halign: 'center',
      valign: 'middle',
      fillColor: [255, 255, 255], // Fondo blanco para las celdas
      textColor: [0, 0, 0], // Texto negro
      lineWidth: 0.25, // Grosor de los bordes
      lineColor: [0, 0, 0] // Color negro para los bordes
    },
    headStyles: {
      fillColor: [200, 200, 200], // Guinda para las cabeceras
      textColor: [0, 0, 0], // Blanco para el texto de las cabeceras
      fontStyle: 'normal'
    },
    margin: { top: 10, bottom: 10 },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { cellWidth: 'auto' },
      2: { cellWidth: 'auto' },
      3: { cellWidth: 'auto' },
      4: { cellWidth: 'auto' },
      5: { cellWidth: 'auto' },
      6: { cellWidth: 'auto' },
      7: { cellWidth: 'auto' }
    }
  });

  // Obtener el PDF como un Blob
  const pdfBlob = doc.output('blob');

  // Crear una URL para el Blob
  const pdfUrl = URL.createObjectURL(pdfBlob);

  // Abrir el PDF en una nueva pestaña
  window.open(pdfUrl, '_blank');
}



export function generatePdfMatricula(data) {
  const doc = new jsPDF();

  doc.addImage(
    "img/logoMin.png",    // Fuente de la imagen
    "PNG",                // Formato de la imagen
    10,                   // Posición X (desde la izquierda)
    10,                   // Posición Y (desde arriba)
    40,                   // Ancho de la imagen
    15,                   // Alto de la imagen
    null,                 // Nombre opcional para el recurso de imagen (puede ser nulo)
    {                    // Opciones adicionales
      align: 'left',      // Alineación (si aplicable)
      rotation: 45        // Rotación en grados
    }
  );
  // Título
  // Cabecera
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("FICHA DE MATRICULA", 105, 15, { align: "center" });
  doc.setFontSize(12);
  doc.text("AÑO 2024", 105, 22, { align: "center" });

  doc.autoTable({
    startY: 30,
    head: [],
    body: [
      [
        { content: "Nombre del CETPRO", styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: "VICTOR RAÚL HAYA DE LA TORRE", styles: { lineWidth: 0.25, lineColor: [0, 0, 0], halign: 'center' } },
        { content: "DRE", styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: "LIMA", styles: { lineWidth: 0.25, lineColor: [0, 0, 0], halign: 'center' } },
        ""
      ],
      [
        { content: "Código Modular", styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: "469452", styles: { lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: "Tipo de Gestión", styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: "Pública", styles: { lineWidth: 0.25, lineColor: [0, 0, 0] } },
        ""
      ],
      [
        { content: "Departamento", styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: "Lima", styles: { lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: "Provincia", styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: "LIMA", styles: { lineWidth: 0.25, lineColor: [0, 0, 0] } },
        ""
      ],
      [
        { content: "Distrito", styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: "ATE", styles: { lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: "R.D.", styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: "RD N° 07592 - 2024 - UGEL 06", styles: { lineWidth: 0.25, lineColor: [0, 0, 0] } },
        ""
      ],
      [
        { content: "Programa de estudios", styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: data.especialidad.nombre, styles: { lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: "Período Lectivo", styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: "2024", styles: { lineWidth: 0.25, lineColor: [0, 0, 0] } },
        ""
      ],
      [
        { content: "Módulo Formativo", styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: data.especialidad.modulo_formativo, styles: { lineWidth: 0.25, lineColor: [0, 0, 0], halign: 'center' } },
        { content: "Periódo de Clase", styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: data.unidades_didacticas.fecha_inicio + " al " + data.unidades_didacticas.fecha_fin, styles: { lineWidth: 0.25, lineColor: [0, 0, 0], halign: 'center' } },
        ""
      ],
      [
        { content: "Nivel Formativo", styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: "AUXILIAR TÉCNICO", styles: { lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: "Periódo Académico", styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: data.especialidad.periodo_academico, styles: { lineWidth: 0.25, lineColor: [0, 0, 0], halign: 'center' } },
        ""
      ],
      [
        { content: "Tipo de Plan de estudios", styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: "MODULAR", styles: { lineWidth: 0.25, lineColor: [0, 0, 0], halign: 'center' } },
        { content: "Número de Documento", styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: data.dni, styles: { lineWidth: 0.25, lineColor: [0, 0, 0], halign: 'center' } },
        ""
      ],
      [
        { content: "Nombres y Apellidos", styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], lineWidth: 0.25, lineColor: [0, 0, 0] } },
        { content: data.nombre_completo, colSpan: 3, styles: { lineWidth: 0.25, lineColor: [0, 0, 0], halign: 'center' } },
        ""
      ],
    ],
    theme: 'plain',
    styles: {
      fontSize: 10,
      cellPadding: 2,
      halign: 'center',
      valign: 'middle',
      textColor: [0, 0, 0] // Color de texto negro por defecto
    },
    margin: { top: 10, bottom: 10 },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { cellWidth: 'auto' },
      2: { cellWidth: 'auto' },
      3: { cellWidth: 'auto' },
      4: { cellWidth: 'auto' }
    }
  });

  doc.setFontSize(14);
  doc.text("UNIDADES DIDACTICAS", 105, doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 125, { align: "center" });


  const headerUnits = [
    { content: 'N°', styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], halign: 'center', lineWidth: 0.25, lineColor: [0, 0, 0] } },
    { content: 'UNIDAD DIDÁCTICA', styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], halign: 'center', lineWidth: 0.25, lineColor: [0, 0, 0] } },
    { content: 'CRÉDITO', styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], halign: 'center', lineWidth: 0.25, lineColor: [0, 0, 0] } },
    { content: 'HORA', styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], halign: 'center', lineWidth: 0.25, lineColor: [0, 0, 0] } },
    { content: 'CONDICIÓN', styles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], halign: 'center', lineWidth: 0.25, lineColor: [0, 0, 0] } },
  ];

  // 2DA TABLA
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 15,
    head: [headerUnits],
    body: data.unidades_didacticas.detalles.map((unidad, index) => [
      { content: (index + 1).toString(), styles: { halign: 'center', lineWidth: 0.25, lineColor: [0, 0, 0] } }, // Numeración
      { content: unidad.nombre_unidad, styles: { halign: 'center', lineWidth: 0.25, lineColor: [0, 0, 0] } },
      { content: unidad.credito_unidad.toString(), styles: { halign: 'center', lineWidth: 0.25, lineColor: [0, 0, 0] } },
      { content: unidad.hora.toString(), styles: { halign: 'center', lineWidth: 0.25, lineColor: [0, 0, 0] } },
      { content: 'G', styles: { halign: 'center', lineWidth: 0.25, lineColor: [0, 0, 0] } },
    ]),
    theme: 'plain',
    styles: {
      fontSize: 10,
      cellPadding: 2,
      halign: 'center',
      valign: 'middle',
    },
    margin: { top: 10, bottom: 10 },
    columnStyles: {
      0: { cellWidth: 'auto' }, // Configuración de la columna de numeración
      1: { cellWidth: 'auto' },
      2: { cellWidth: 'auto' },
      3: { cellWidth: 'auto' },
      4: { cellWidth: 'auto' }
    }
  });


  // // CABECERA 3ERA
  // const headerUnitsSub = [
  //   [
  //     { content: 'UNIDADES DIDACTICAS DE SUBSANACIÓN', styles: { fillColor: [122, 0, 25], textColor: [0, 0, 0], halign: 'center', lineWidth: 0.5, lineColor: [0, 0, 0] } },
  //   ],
  //   [
  //     { content: 'N°', styles: { fillColor: [122, 0, 25], textColor: [0, 0, 0], halign: 'center', lineWidth: 0.5, lineColor: [0, 0, 0] } },
  //     { content: 'UNIDAD DIDÁCTICA', styles: { fillColor: [122, 0, 25], textColor: [0, 0, 0], halign: 'center', lineWidth: 0.5, lineColor: [0, 0, 0] } },
  //     { content: 'CRÉDITO', styles: { fillColor: [122, 0, 25], textColor: [0, 0, 0], halign: 'center', lineWidth: 0.5, lineColor: [0, 0, 0] } },
  //     { content: 'HORA', styles: { fillColor: [122, 0, 25], textColor: [0, 0, 0], halign: 'center', lineWidth: 0.5, lineColor: [0, 0, 0] } },
  //     { content: 'CONDICIÓN', styles: { fillColor: [122, 0, 25], textColor: [0, 0, 0], halign: 'center', lineWidth: 0.5, lineColor: [0, 0, 0] } },
  //   ],
  //   [
  //     { content: '', styles: { fillColor: [0, 0, 0], halign: 'center', lineWidth: 0.5, lineColor: [0, 0, 0] } },
  //     { content: '', styles: { fillColor: [0, 0, 0], halign: 'center', lineWidth: 0.5, lineColor: [0, 0, 0] } },
  //     { content: '', styles: { fillColor: [0, 0, 0], halign: 'center', lineWidth: 0.5, lineColor: [0, 0, 0] } },
  //     { content: '', styles: { fillColor: [0, 0, 0], halign: 'center', lineWidth: 0.5, lineColor: [0, 0, 0] } },
  //     { content: '', styles: { fillColor: [0, 0, 0], halign: 'center', lineWidth: 0.5, lineColor: [0, 0, 0] } },
  //   ]
  // ];

  // // 3ERA TABLA
  // doc.autoTable({
  //   startY: 30,
  //   head: headerUnitsSub,
  //   body: [
  //     [{ content: "", styles: { halign: 'center', lineWidth: 0.5, lineColor: [0, 0, 0] } }, // Numeración
  //     { content: "", styles: { halign: 'center', lineWidth: 0.5, lineColor: [0, 0, 0] } },
  //     { content: "", styles: { halign: 'center', lineWidth: 0.5, lineColor: [0, 0, 0] } },
  //     { content: "", styles: { halign: 'center', lineWidth: 0.5, lineColor: [0, 0, 0] } },
  //     { content: "", styles: { halign: 'center', lineWidth: 0.5, lineColor: [0, 0, 0] } }],
  //   ],
  //   theme: 'plain',
  //   styles: {
  //     fontSize: 10,
  //     cellPadding: 2,
  //     halign: 'center',
  //     valign: 'middle',
  //   },
  //   margin: { top: 10, bottom: 10 },
  //   columnStyles: {
  //     0: { cellWidth: 'auto' }, // Configuración de la columna de numeración
  //     1: { cellWidth: 'auto' },
  //     2: { cellWidth: 'auto' },
  //     3: { cellWidth: 'auto' },
  //     4: { cellWidth: 'auto' }
  //   }
  // });

  // Agregar las líneas para las firmas al final del documento
  const yPosition = doc.lastAutoTable.finalY + 25; // Ajusta el margen según sea necesario

  // Línea para la firma del director
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("______________________________", 20, yPosition); // Posición X e Y de la línea
  doc.text("DIRECTOR", 40, yPosition + 10); // Texto debajo de la línea

  // Línea para la firma del estudiante
  doc.text("______________________________", 120, yPosition); // Posición X e Y de la línea
  doc.text("ESTUDIANTE", 145, yPosition + 10); // Texto debajo de la línea

  // Obtener el PDF como un Blob
  const pdfBlob = doc.output('blob');

  // Crear una URL para el Blob
  const pdfUrl = URL.createObjectURL(pdfBlob);

  // Abrir el PDF en una nueva pestaña
  window.open(pdfUrl, '_blank');
}


export function reporteNominaUgel(data) {
  const doc = new jsPDF('l', 'mm', 'a4'); // 'l' para orientación horizontal

  doc.addImage(
    "img/logoMin.png",    // Fuente de la imagen
    "PNG",                // Formato de la imagen
    15,                   // Posición X (desde la izquierda)
    10,                   // Posición Y (desde arriba)
    45,                   // Ancho de la imagen
    15,                   // Alto de la imagen
    null,                 // Nombre opcional para el recurso de imagen (puede ser nulo)
    {                    // Opciones adicionales
      align: 'left',      // Alineación (si aplicable)
      rotation: 45        // Rotación en grados
    }
  );


  const headers = [
    "N°", "UGEL", "CODIGO MODULAR", "NOMBRE DEL CETPRO", "PROGRAMA DE ESTUDIOS",
    "CICLO", "N° DE RESOLUCION QUE AUTORIZA EL PROGRAMA DE ESTUDIO",
    "MODULO DEL PROGRAMA DE ESTUDIOS", "TIPO DE DOCUMENTO", "N° DNI",
    "APELLIDO PATERNO", "APELLIDO MATERNO", "NOMBRES",
    "SEXO", "FECHA DE NACIMIENTO"
  ];

  // Datos estáticos
  const staticData = [
    "06",
    "469452",
    "VICTOR RAÚL HAYA DE LA TORRE",
    data.nombre_especialidad, // Programa de estudios
    "AUXILIAR TÉCNICO",
    "RD N° 07592 - 2024 - UGEL 06",
  ];

  // Convertir los datos de la API a formato para la tabla
  const tableRows = data.estudiantes.map((estudiante, index) => [
    (index + 1).toString(), // Agregar el iterador (numeración) en la primera columna
    ...staticData.slice(0, 6), // Copia los datos estáticos
    data.modulo_formativo,
    "DNI",
    estudiante.dni,
    estudiante.apellido_paterno.toUpperCase(),
    estudiante.apellido_materno.toUpperCase(),
    estudiante.nombre.charAt(0).toUpperCase() + estudiante.nombre.slice(1).toLowerCase(), // Inicial en mayúscula, resto en minúscula
    estudiante.sexo,
    estudiante.fecha_nacimiento
  ]);

  // Imprimir el título de la tabla
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("REGISTRO DE MATRÍCULA INSTITUCIONAL DEL PROGRAMA DE ESTUDIOS  2024-I", 160, 20, { align: 'center' });

  // Imprimir la tabla
  doc.autoTable({
    startY: 30,
    head: [headers],
    body: tableRows,
    styles: {
      fontSize: 6,
      cellPadding: 3,
      halign: 'center',
      valign: 'middle',
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      lineWidth: 0.25,
      lineColor: [0, 0, 0] // Borde negro para las celdas
    },
    headStyles: {
      fillColor: [200, 200, 200], // Guinda para las cabeceras
      textColor: [0, 0, 0] // Blanco para el texto de las cabeceras
    },
    margin: { top: 20, bottom: 10 }
  });

  // Obtener el PDF como un Blob
  const pdfBlob = doc.output('blob');

  // Crear una URL para el Blob
  const pdfUrl = URL.createObjectURL(pdfBlob);

  // Abrir el PDF en una nueva pestaña
  window.open(pdfUrl, '_blank');
}