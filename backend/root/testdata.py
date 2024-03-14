RESULT = [
    {
        "msg": "Tasks are the building blocks of Celery applications.",
        "speaker": "speaker1",
        "timecode": "2024-03-14T11:02:50.779232+03:00",
    },
    {
        "msg": "A task is a class that can be created out of any callable. It performs dual roles in that it defines both what happens when a task is called (sends a message), and what happens when a worker receives that message.",
        "speaker": "speaker2",
        "timecode": "2024-03-14T11:02:51.879232+03:00",
    },
    {
        "msg": "Every task class has a unique name, and this name is referenced in messages so the worker can find the right function to execute.",
        "speaker": "speaker1",
        "timecode": "2024-03-14T11:02:52.779232+03:00",
    },
    {
        "msg": "A task message is not removed from the queue until that message has been acknowledged by a worker. A worker can reserve many messages in advance and even if the worker is killed – by power failure or some other reason – the message will be redelivered to another worker.",
        "speaker": "speaker2",
        "timecode": "2024-03-14T11:02:53.779232+03:00",
    },
    {
        "msg": "Ideally task functions should be idempotent: meaning the function won’t cause unintended effects even if called multiple times with the same arguments. Since the worker cannot detect if your tasks are idempotent, the default behavior is to acknowledge the message in advance, just before it’s executed, so that a task invocation that already started is never executed again.",
        "speaker": "speaker3",
        "timecode": "2024-03-14T11:02:54.779232+03:00",
    },
    {
        "msg": "If your task is idempotent you can set the acks_late option to have the worker acknowledge the message after the task returns instead. See also the FAQ entry Should I use retry or acks_late?.",
        "speaker": "speaker1",
        "timecode": "2024-03-14T11:02:55.779232+03:00",
    },
    {"msg": "Note that the worker will acknow", "speaker": "speaker2", "timecode": "2024-03-14T11:02:50.779232+03:00"},
]
