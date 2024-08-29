import asyncio
import websockets
import socket

udp_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
server_websocket_port= 7072
target_udp_ip = "127.0.0.1"
target_udp_port = 7073

bool_display_received = True

async def handler(websocket, path):
    while True:
        global target_port
        data = await websocket.recv()
        data_as_string = str(data)
        
        if bool_display_received:
            print(f"Received| {data_as_string}")
        date_parts = data_as_string.split(":")
        if(len(date_parts) == 2):
            key = date_parts[0]
            value = date_parts[1]
            print(f"Key {key}  |  Value {value}")
            try:
                value = int(value)
                value_bytes = value.to_bytes(2, byteorder='little')
                udp_socket.sendto(value_bytes, (target_udp_ip, target_udp_port))
                print(f"Push Integer| {value} |{value_bytes}")
            except ValueError:
                pass
            
start_server = websockets.serve(handler, "localhost", server_websocket_port)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()