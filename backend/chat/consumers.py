from channels.generic.websocket import AsyncJsonWebsocketConsumer
from api.models import Recognition
from channels.db import database_sync_to_async

class ChatConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        pk = self.scope["url_route"].get("kwargs", {}).get("recognition_id")
        task = await database_sync_to_async(Recognition.objects.filter)(id=pk)
        await database_sync_to_async(task.update)(channel=self.channel_name)
        await self.accept()
        await self.send_json({"type": "chat_message", "msg": "Доступные команды:"})
        await self.send_json({"type": "chat_message", "msg": "/summary - резюмировать итоги встречи"})
        await self.send_json({"type": "chat_message", "msg": "/print - протокол встречи в формате .doc"})
        await self.send_json({"type": "chat_message", "msg": "/tasks - резюмировать поручения"})
        await self.send_json({"type": "chat_message", "msg": "/rename <source> <dst> - переименовать спикера"})

    async def disconnect(self, close_code):
        pass

    async def receive(self, data):
        print(data)
        pass

    async def chat_message(self, event):
        # chat msg type
        await self.send_json(event)

    async def file(self, event):
        # file type
        await self.send_json(event)
