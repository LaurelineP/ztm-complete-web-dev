import React, { Component } from 'react';

class ScrollableView extends Component {
	render(){
		return (
			<div style={{ overflow: 'auto' }}>
				{this.props.children}
			</div>
		)
	}
}

export default ScrollableView;