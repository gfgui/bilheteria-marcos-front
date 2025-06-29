// lib/api.ts
import axios from "axios"

const api = axios.create({
  baseURL: process.env.BACKEND_URL || "http://localhost:3333/api",
})

export default api