import { useCallback, useEffect, useRef, useState } from 'react'

type MessageHandler = (message: any) => void

const RECONNECTION_DELAY_MS = 1_000

const HEARTBEAT_INTERVAL_MS = 5000

const useWebSocket = (url: string, onMessage?: MessageHandler) => {
  const socket = useRef<WebSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  // Function to initialize WebSocket connection
  const connect = useCallback(() => {
    socket.current = new WebSocket(url)

    socket.current.onopen = () => {
      console.log('WebSocket connected')
      setIsConnected(true)
    }

    socket.current.onclose = () => {
      console.log('WebSocket disconnected')
      setIsConnected(false)
      // Attempt to reconnect every 1 seconds if the socket closes
      //   setTimeout(() => {
      //     connect()
      //   }, RECONNECTION_DELAY_MS)
    }

    socket.current.onerror = (error) => {
      console.error('WebSocket error:', JSON.stringify(error))
    }

    socket.current.onmessage = (event) => {
      if (onMessage) {
        onMessage(JSON.parse(event.data))
      }
    }
  }, [url, onMessage])

  // Effect to manage the lifecycle of the websocket
  useEffect(() => {
    connect()

    return () => {
      if (socket.current) {
        socket.current.close()
      }
    }
  }, [connect])

  // Function to send data through the WebSocket
  const send = useCallback((data: any) => {
    if (socket.current && socket.current.readyState === WebSocket.OPEN) {
      socket.current.send(JSON.stringify(data))
    } else {
      console.error('WebSocket is not connected.')
    }
  }, [])

  // Function to keep the connection alive
  useEffect(() => {
    const interval = setInterval(() => {
      if (socket.current && socket.current.readyState === WebSocket.OPEN) {
        socket.current.send(JSON.stringify({ type: 'ping' }))
      }
    }, HEARTBEAT_INTERVAL_MS) // Ping every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return { send, isConnected }
}

export default useWebSocket
