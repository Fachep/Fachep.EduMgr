using Microsoft.EntityFrameworkCore;

namespace Fachep.EduMgr.Infrastructure.Data;

public static class UnitOfWorkExtensions
{
    extension(IUnitOfWork<DbContext> unitOfWork)
    {
        public QueryTrackingBehavior QueryTrackingBehavior
        {
            get => unitOfWork.Context.ChangeTracker.QueryTrackingBehavior;
            set => unitOfWork.Context.ChangeTracker.QueryTrackingBehavior = value;
        }
    }
}
