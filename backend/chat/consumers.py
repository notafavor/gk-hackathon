from channels.generic.websocket import AsyncJsonWebsocketConsumer
from api.models import Recognition
from channels.db import database_sync_to_async

class ChatConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        pk = self.scope["url_route"].get("kwargs", {}).get("recognition_id")
        task = await database_sync_to_async(Recognition.objects.filter)(id=pk)
        await database_sync_to_async(task.update)(channel=self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, data):
        print(data)
        pass
