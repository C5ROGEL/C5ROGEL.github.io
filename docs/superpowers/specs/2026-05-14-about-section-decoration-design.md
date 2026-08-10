# About Section Decoration - Design

## Overview

Agregar elementos decorativos sutiles al espacio vacío en la columna izquierda de la sección "Sobre mí" del portfolio.

## Problem

El espacio izquierdo de la sección About (columnas 1-4 del grid de 12) queda vacío y excesivamente blanco, creando un desbalance visual con el resto del layout.

## Solution

Combinar dos elementos decorativos sutiles:

### 1. Línea vertical

- Posición: borde derecho de la columna vacía (justo antes de donde empieza el contenido)
- Grosor: 1px
- Color: `hsl(var(--primary) / 0.15)` — funciona en ambos modos
- Extensión: desde el eyebrow hasta el final de la sección

### 2. Patrón de dots

- Posición: toda la columna vacía (columnas 1-4)
- Patrón: dots de 1px separados ~20px
- Color: `hsl(var(--primary) / 0.04)` — apenas visible
- Opacidad: 3-5%, sutil pero presente

## Implementation

Modificar `src/components/portfolio/Section.tsx` para agregar los elementos decorativos en la columna izquierda (donde está el `div.md:col-span-4`).

## Behavior

- Responsive: en mobile (< md) los elementos no aparecen
- Funciona en ambos temas: claro y oscuro
- No afecta la accesibilidad ni el contenido
- Animación: none (elementos estáticos)

## Acceptance Criteria

- [ ] Línea vertical visible en ambos modos
- [ ] Patrón de dots apenas perceptible
- [ ] No rompe el layout actual
- [ ] Funciona en desktop (md+)