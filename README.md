# Lumbar Assist MVP

Prototipo interactivo simulado para validar con profesionales médicos una propuesta de tesis de Ingeniería en Informática. La aplicación representa un flujo futuro de análisis asistido de resonancias magnéticas lumbares sagitales, usando únicamente datos ficticios, imágenes esquemáticas y máscaras generadas artificialmente.

## Instalación

```bash
npm install
```

## Ejecución local

```bash
npm run dev
```

Luego abrir la URL local indicada por Vite, normalmente:

```text
http://127.0.0.1:5173
```

## Qué incluye el prototipo

- Dashboard inicial con aviso de uso simulado.
- Carga ficticia de estudio RM lumbar sagital.
- Procesamiento simulado con pasos visuales.
- Visor 2D con imagen radiológica esquemática, máscaras, etiquetas y mediciones.
- Selección de vértebras, discos intervertebrales y canal espinal.
- Estados de confianza simulados, incluyendo advertencias de baja confianza.
- Panel de mediciones cuantitativas editables.
- Checklist de revisión profesional.
- Preinforme estructurado editable y copiable.
- Visualización 3D conceptual mediante SVG.
- Formulario de feedback para User Research con exportación JSON.

## Partes simuladas

Este prototipo no implementa IA real, entrenamiento, inferencia, backend, manejo de DICOM, procesamiento médico real ni conexión con servicios externos. Las siguientes partes son mockeadas:

- Estudio y metadatos.
- Segmentaciones anatómicas.
- Máscaras visuales.
- Mediciones cuantitativas.
- Estados de confianza.
- Procesamiento por etapas.
- Preinforme.
- Respuestas de feedback.

## Representación del sistema real futuro

En una versión real, el sistema podría reemplazar estas simulaciones por:

- Carga y lectura de estudios médicos reales bajo condiciones éticas y regulatorias.
- Segmentación automática basada en modelos entrenados.
- Mediciones geométricas calculadas a partir de máscaras reales.
- Corrección profesional sobre segmentaciones.
- Persistencia de revisiones y salidas estructuradas.
- Visualización 3D con modelos anatómicos o reconstrucciones derivadas del estudio.

## Uso en entrevistas de User Research

El prototipo está pensado para mostrar el flujo completo a profesionales de diagnóstico por imágenes, traumatología, neurocirugía o áreas relacionadas. Durante la entrevista se puede recorrer el wizard de principio a fin y observar:

- Si el flujo resulta claro.
- Qué tareas se perciben como útiles para asistencia operativa.
- Qué puntos generan dudas o desconfianza.
- Qué mediciones o visualizaciones serían necesarias.
- Si el rol del profesional queda correctamente preservado.
- Qué funcionalidades deberían priorizarse para un MVP real.

## Limitaciones

- No utiliza datos reales de pacientes.
- No genera diagnósticos.
- No valida patologías.
- No evalúa desempeño de modelos de IA.
- No representa precisión anatómica completa.
- La visualización 3D es conceptual y simplificada.
- Las mediciones son geométricas simuladas.

## Aclaración

No apto para uso clínico. Prototipo simulado para validación académica.
