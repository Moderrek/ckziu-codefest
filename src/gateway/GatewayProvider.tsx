import { createContext, ReactNode, useEffect, useState } from 'react';

import { isDev } from '@/lib/utils';

class Gateway {
  private socket: WebSocket | undefined;
  private connected = false;

  get is_connected() {
    return this.connected;
  }

  connect() {
    if (this.is_connected) {
      return;
    }
    this.socket = new WebSocket(
      isDev
        ? 'ws://localhost:8080/gateway'
        : 'wss://api.ckziucodefest.pl/gateway'
    );
    this.socket.onopen = (event) => {
      this.connected = true;
      this.on_connect();
    };
    this.socket.onerror = (event) => {
      console.error('Gateway error');
    };
    this.socket.onclose = (event) => {
      this.connected = false;
      console.log('Gateway close');
    };
  }

  disconnect() {
    if (this.is_connected) {
      this.socket!.close();
    }
  }

  send(data: any) {
    if (this.is_connected) {
      this.socket!.send(JSON.stringify(data));
    }
  }

  private on_connect() {
    console.log('Gateway open');
    this.socket!.send('hello');
  }
}

interface GatewayContextProps {
  gateway: Gateway | null;
  setGateway: ((gateway: Gateway) => void) | null;
}

const GatewayContext = createContext<GatewayContextProps>({
  gateway: null,
  setGateway: null
});

const GatewayProvider = ({ children }: { children: ReactNode }) => {
  const [gateway, setGateway] = useState<Gateway | null>(null);

  useEffect(() => {
    if (gateway !== null) return;
    const g = new Gateway();
    g.connect();
    setGateway((prev) => {
      if (prev !== null) {
        prev.disconnect();
      }
      return g;
    });
  }, [gateway]);

  return (
    <GatewayContext.Provider
      value={{
        gateway: gateway,
        setGateway: setGateway
      }}
    >
      {children}
    </GatewayContext.Provider>
  );
};

export { GatewayContext, GatewayProvider };
