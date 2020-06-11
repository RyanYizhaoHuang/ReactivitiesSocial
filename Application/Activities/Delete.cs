using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest
        {
            // Properties
            public Guid Id { get; set; }
        }
        
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
        
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);

                if (activity == null)
                    throw new Exception("Could not find activity");

                _context.Remove(activity);
                // Handler logic here
                var success = await _context.SaveChangesAsync() > 0; // return num of save in DB
        
                if (success) return Unit.Value;
        
                throw new Exception("Problem saving changes");
            }
        }
    }
}