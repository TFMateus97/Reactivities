using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Comments;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator _medaitor;
        public ChatHub(IMediator mediator)
        {
            this._medaitor = mediator;
        }

        public async Task SendComment(Create.Command command)
        {
            var comment = await _medaitor.Send(command);

            await Clients
                .Group(command.ActivityId.ToString())
                .SendAsync("ReceiveComment", comment.Value);
        }
        //signalR n tem route parameter
        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var activityId = httpContext.Request.Query["activityId"];

            await Groups.AddToGroupAsync(Context.ConnectionId, activityId);

            var result = await _medaitor.Send(new List.Query { ActivityId = Guid.Parse(activityId) });
            await Clients.Caller.SendAsync("LoadComments", result.Value);
        }
    }
}