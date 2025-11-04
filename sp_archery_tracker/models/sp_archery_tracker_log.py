from odoo import api, fields, models

class SPArcheryTrackerLog(models.Model):
    _name = "sp.archery.tracker.log"

    name = fields.Char(default=f"Practice {fields.Datetime.to_string(fields.Datetime.now())}")
    date = fields.Datetime(default=fields.Datetime.now())
    user_id = fields.Many2one("res.users", string="User")
    ends = fields.Json(default={"ends": []})
    score = fields.Integer(compute="_compute_score")

    @api.depends("ends")
    def _compute_score(self):
        for record in self:
            # for end in record.ends:

            record.score = 0
