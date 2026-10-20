# Formulario de Google + panel de respuestas

Objetivo: que las familias llenen un formulario de Google desde el sitio, que las respuestas se guarden en la hoja de cálculo de Google, y que la escuela vea un panel con esos datos dentro del sitio.

## 1. Formulario de Google en la página

- En la sección de contacto de la página principal se muestra el formulario de Google incrustado, con el mismo estilo del sitio (marco redondeado, fondo azul marino, altura adaptable en celular).
- Debajo queda el enlace "Abrir el formulario en una pestaña nueva" por si alguien tiene bloqueado el contenido incrustado.
- El formulario de contacto actual (el que abre el correo) se conserva como alternativa breve; si prefieres, lo quitamos.
- Necesito el enlace del formulario. Mientras no lo tengas, dejo el enlace configurado en un solo lugar del código para cambiarlo en segundos.

## 2. Lectura de la hoja de cálculo

- Conecto Google Sheets mediante el conector oficial (aparecerá una tarjeta de permiso en el chat que debes aceptar con la cuenta dueña de la hoja).
- La lectura se hace del lado del servidor, nunca desde el navegador, para que las credenciales no queden expuestas.
- Se leen las respuestas de la hoja vinculada al formulario y se convierten en filas con: fecha, nombre, correo, teléfono, nivel de interés y mensaje (ajustable a las columnas reales).

## 3. Panel de respuestas (dashboard)

- Nueva página privada `/panel`, protegida con una contraseña de acceso que se guarda como secreto del proyecto (no queda escrita en el código).
- Contenido del panel:
  - Tarjetas de resumen: total de solicitudes, solicitudes de los últimos 7 y 30 días.
  - Gráfica de solicitudes por semana.
  - Desglose por nivel/grado de interés.
  - Tabla con todas las respuestas, buscador por nombre o correo, y botón para descargar en CSV.
- Se actualiza al recargar la página; se guarda en memoria unos minutos para no saturar el límite de consultas de Google.
- El panel no aparece en el menú público.

## Notas técnicas

- Ruta nueva `src/routes/panel.tsx`; el menú sigue mostrando solo Home y Nosotros.
- Lectura vía `createServerFn` en `src/lib/sheets.functions.ts`, llamando al gateway de Google Sheets (`/v4/spreadsheets/{id}/values/{rango}`) con caché en memoria y manejo de errores 4xx/429 sin reintentos agresivos.
- Contraseña del panel validada en el servidor contra un secreto (`PANEL_PASSWORD`), guardada en el navegador como sesión; nada de contraseñas en el código del cliente.
- Gráficas con Recharts; identificadores del formulario y de la hoja en un solo archivo de configuración.

## Lo que necesito de ti

1. El enlace del formulario de Google.
2. El enlace de la hoja de cálculo con las respuestas.
3. Aceptar la tarjeta de conexión de Google Sheets cuando aparezca.
