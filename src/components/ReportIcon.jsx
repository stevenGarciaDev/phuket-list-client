import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import { report } from '../services/postService';

class ReportIcon extends Component {

  constructor(props) {
    super(props);
    this.state = {
      DisplayRep: false,
      taskId: this.props.taskId
    }
  }

  displayReport= (e) => {
    e.preventDefault();
    this.setState({
        DisplayRep: !this.state.DisplayRep
      });
  };

  handleReportButton = async (e) => {
    e.preventDefault(); // prevent refresh

   this.setState({ // turns of display for this button
    DisplayRep: !this.state.DisplayRep
  });

   this.props.handleReport(); // use function in post component to make post hidden
    const jwt = localStorage.getItem("token"); //update database
    await report(this.state.taskId, jwt);
  };


  render() {
    return (
        <React.Fragment>
            <div className="like-container">
                    <i onClick={e =>this.displayReport(e)} className="fa fa-flag fa-2x" aria-hidden="true"></i>
            </div>

            { this.state.DisplayRep &&
              <div className="report-modal-display">
                <div className="report-modal-content">
                  <div>
                    <div>
                        <label>
                            <input type="checkbox" id="Tier1" name="Tier1" />
                            <label for="Tier1">Tier-1</label>

                        </label>

                        <label>
                            <input type="checkbox" id="Tier2" name="Tier2" />
                            <label for="Tier2">Tier-2</label>

                        </label>

                        <label>
                            <input type="checkbox" id="Tier3" name="Tier3" />
                            <label for="Tier3">Tier-3</label>
                        </label>

                    </div>
                    <Form >
                      <Form.Group >

                          <Form.Control as="textarea" rows="3"  type="text"  size = 'sm'/>


                          <div className="profile-btn-container">
                            <button onClick={e=> this.handleReportButton(e) } >Report</button>
                            <button onClick={e =>this.displayReport(e)} >Cancel Report</button>
                          </div>

                      </Form.Group>
                   </Form>
                  </div>
                </div>
              </div>
            }
        </React.Fragment>
    );
  }

}

export default ReportIcon;
//e.preventDefault()
