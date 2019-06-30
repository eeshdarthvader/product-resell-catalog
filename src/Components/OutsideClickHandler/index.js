import React, { Component } from 'react';
import PropTypes from 'prop-types';

class OutsideClickHandler extends Component {
	constructor(props) {
		super(props);
		this.node = React.createRef();
	}

	componentWillMount() {
		document.addEventListener('mousedown', this.handleClick, false);
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClick, false);
	}

	handleClick = event => {
		if (this.node.current.contains(event.target)) {
			// console.log('clicked inside')
			return;
		} else {
			// console.log('clicked outside')
			this.props.onOutsideClick();
		}
	};

	render() {
		return <div ref={this.node}>{this.props.children}</div>;
	}
}

OutsideClickHandler.propTypes = {
	children: PropTypes.node.isRequired,
	onOutsideClick: PropTypes.func,
};

OutsideClickHandler.defaultProps = {
	onOutsideClick: () => {},
};

export default OutsideClickHandler;
