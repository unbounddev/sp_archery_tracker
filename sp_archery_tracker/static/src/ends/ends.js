import { Component, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { standardFieldProps } from "@web/views/fields/standard_field_props";

const MEASUREMENT_UNITS = {
  METER: "m",
  FEET: "ft",
  YARDS: "yd"
}

export class Ends extends Component {
  static template = "sp_archery_tracker.Ends";
  static props = {...standardFieldProps};
  setup() {
    this.state = useState({
      selectedArrow: null,
      selectedEnd: null,
      showArrowDialog: false
    })
    if (!this.value || !this.value.ends){
      this.setDefault();
    }
    this.addArrow = this.addArrow.bind(this);
    this.openArrowDialog = this.openArrowDialog.bind(this);
  }
  get value(){
    return this.props.record.data.ends;
  }
  async setDefault() {
      try {
        await this.props.record.update({ ends: { ends: [] } }, { save: true });
      }
      catch(e) {
        console.log("ERROR: Couldn't set default value");
      }
  }
  async addEnd() {
    try {
      await this.props.record.update({ ends: { ends: [...this.value.ends, { distance: 20, unit: MEASUREMENT_UNITS.YARDS, arrows: [] }] } }, { save: true });
    } catch (e) {
      console.log("ERROR: Could not add end")
    }
  } 
  async addArrow(end) {
    try {
      const ends = JSON.parse(JSON.stringify(this.value.ends));
      ends[end].arrows.push(0);
      await this.props.record.update({ ends: { ends }}, { save: true });
    } catch (e) {
      console.log("ERROR: Could not add arrow")
    }
  }
  closeArrowDialog() {
    this.state.showArrowDialog = false;
    this.state.selectedArrow = null;
    this.state.selectedEnd = null;
  }
  openArrowDialog(end, arrow) {
    this.state.showArrowDialog = true;
    this.state.selectedArrow = arrow;
    this.state.selectedEnd = end;
  }
  async deleteArrow(){
    if (this.state.selectedEnd != null && this.state.selectedArrow != null){
      try {
        const ends = JSON.parse(JSON.stringify(this.value.ends));
        ends[this.state.selectedEnd].arrows.splice(this.state.selectedArrow, 1);
        await this.props.record.update({ ends: { ends }}, { save: true });
        this.closeArrowDialog();
      } catch (e) {
        console.log("ERROR: Could not delete arrow");
      }
    }
  }
}

export const endsField = {
  component: Ends
}
registry.category("fields").add("ends", endsField);
