from odoo import api, fields, models

class SPArcheryTrackerLog(models.Model):
    _name = "sp.archery.tracker.log"

    name = fields.Char(default=f"Practice {fields.Datetime.to_string(fields.Datetime.now())}")
    date = fields.Datetime(default=fields.Datetime.now())
    user_id = fields.Many2one("res.users", string="User")
    ends = fields.Json(default={"ends": []})
    score = fields.Integer(compute="_compute_score", store=True)

    @api.depends("ends")
    def _compute_score(self):
        for record in self:
            new_score = 0
            for end in record.ends['ends']:
                for arrow in end['arrows']:
                    arrow_value = 0
                    try:
                        arrow_value = int(arrow)
                    except:
                        if arrow == "X":
                            arrow_value = 10
                        else:
                            arrow_value = 0
                    new_score = new_score + arrow_value

            record.score = new_score
