import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { standardFieldProps } from "@web/views/fields/standard_field_props";
export class Ends extends Component {
  static template = "sp_archery_tracker.Ends";
  static props = {...standardFieldProps};
  setup() {
    console.log(this.props.record.data.ends.ends)
    console.log(this.props)

  }
}

export const endsField = {
  component: Ends
}
registry.category("fields").add("ends", endsField);
