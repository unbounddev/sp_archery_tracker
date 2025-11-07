from odoo import api, fields, models

class SPArcheryTrackerLog(models.Model):
    _name = "sp.archery.tracker.log"

    name = fields.Char(default=f"Practice {fields.Datetime.to_string(fields.Datetime.now())}")
    date = fields.Datetime(default=fields.Datetime.now())
    user_id = fields.Many2one("res.users", string="User")
    ends = fields.Json(default={"ends": []})
    score = fields.Integer(compute="_compute_stats", store=True)
    num_of_tens = fields.Integer(compute="_compute_stats", store=True, string="10's")
    num_of_x = fields.Integer(compute="_compute_stats", store=True, string="X's")

    @api.depends("ends")
    def _compute_stats(self):
        for record in self:
            new_score = 0
            num_of_x = 0
            num_of_tens = 0
            for end in record.ends['ends']:
                for arrow in end['arrows']:
                    arrow_value = 0
                    try:
                        arrow_value = int(arrow)
                    except:
                        if arrow == "X":
                            arrow_value = 10
                            num_of_x += 1
                        else:
                            arrow_value = 0
                    if arrow_value == 10:
                        num_of_tens += 1
                    new_score += arrow_value

            record.score = new_score
            record.num_of_x = num_of_x
            record.num_of_tens = num_of_tens
