from odoo.http import request, route, Controller

class ArcheryTrackerController(Controller):
    @route("/archery_tracker", auth="user")
    def archery_tracker(self):
        return request.render(
            "sp_archery_tracker.archery_tracker",
            {
                'session_info': request.env['ir.http'].get_frontend_session_info(),
            }
        )
