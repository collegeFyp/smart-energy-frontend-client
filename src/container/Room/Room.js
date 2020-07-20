import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/action/index";
import Spinner from "../../component/UI/Spinner/Spinner";
import Room from "../../component/Room/Room";
import Modal from "../../component/UI/Modal/Modal";
import AddRoom from "./AddRoom/AddRoom";
class Rooms extends Component {
  state = {
    addRoom: false,
  };
  componentDidMount() {
    const userId = this.props.userId;
    this.props.onInitRoom(this.props.token, userId);
  }

  openAddRoomModel = (edit) => {
    this.setState({
      edit: edit,
    });
  };
  closeAddRoomModel = () => {
    this.setState({
      addRoom: false,
    });
  };

  render() {
    let roomBody = <Spinner />;
    if (this.props.rooms && !this.props.loading) {
      roomBody = this.props.rooms.map((room) => (
        <Room
          key={room._id}
          roomName={room.name}
          down={room.off}
          on={room.on}
          userId={this.props.match.params.userId}
          id={room._id}
        />
      ));
    }
    return (
      <div className="col d-flex flex-wrap">
        {roomBody}
        <Modal show={this.state.addRoom} modalClosed={this.closeAddRoomModel}>
          <AddRoom
            userId={this.props.match.params.userId}
            modalClosed={this.closeAddRoomModel}
          />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    rooms: state.rooms.rooms,
    loading: state.rooms.loading,
    error: state.rooms.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onInitRoom: (token, userId) => dispatch(actions.fetchRoom(token, userId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
