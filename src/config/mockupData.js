import { MODE } from "./constants";

var dataMockup = [
  {
    id: '0001',
    status: "HECHO",
    title: "Tarea de ejemplo 0",
    description: "Esta es una tarea de ejemplo que ya está hecha.",
    created_at: "2024-09-01T10:00:00Z",
    tags: "tasks,dev,low",
  },
  {
    id: '0002',
    status: "PENDIENTE",
    title: "Tarea de ejemplo 1",
    description: "Esta es una tarea de ejemplo que está pendiente.",
    created_at: "2024-09-01T10:00:00Z",
    tags: "dev,high",
  },
  {
    id: '0003',
    status: "PENDIENTE",
    title: "Tarea materia",
    description: "Hacer una tarea para el domingo.",
    created_at: "2024-09-29T10:00:00Z",
    expires: "2024-09-30T10:00:00Z",
    tags: "homework",
  },
  {
    id: '0004',
    status: "PENDIENTE",
    title: "Tarea de Hoy",
    description: "Esta es una tarea para hoy",
    created_at: new Date().toISOString(),
    expires: new Date().toISOString(),
    tags: "tasks,dev,low",
  }
]
export function mockup(){
  const isGHP = window.location.hostname.includes("github.io");
  if ((MODE === "demo" || isGHP) && !window.data) {
    window.data = dataMockup; 
  }
}