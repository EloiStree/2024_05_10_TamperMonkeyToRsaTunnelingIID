import asyncio
import websockets
import socket

udp_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
target_ip = "127.0.0.1"
target_port = 7073

async def handler(websocket, path):
    while True:
        global target_port
        data = await websocket.recv()
        print(f"Key Value| {data}")
        date_parts = data.split(":")
        if(len(date_parts) == 2):
            key = date_parts[0]
            value = date_parts[1]
            print(f"Key {key}  |  Value {value}")
            try:
                value = int(value)
                value_bytes = value.to_bytes(2, byteorder='little')
                udp_socket.sendto(value_bytes, (target_ip, target_port))
                print(f"Push Integer| {value} |{value_bytes}")
            except ValueError:
                pass
            
start_server = websockets.serve(handler, "localhost", 7072)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()