import React, { Component, Fragment } from 'react';
import { VariableSizeList as List } from 'react-window';

// const Row = ({ index, style }) => (
//     <div className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>
//         Row {index}
//     </div>
// );

class Scroll extends Component {
    listRef = React.createRef();

    constructor(props) {
        super(props)
        this.state = {
            lists: [1,2,3,4,5,6,7,8,9,10]
        }
    }

    handleClear = () => {
        this.setState({
            lists: []
        })
     }
    
    handleSubmit = () => {
        const { lists } = this.state
        
        this.setState({
            lists: [...lists, lists[lists.length - 1] + 1]
        }, () => {
            this.listRef.current.scrollToItem(lists.length);
        })
    }

    rowContent = () => ({ index, style }) => {
        return (
            <div className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>
                Row {index}
            </div>
        )
    }

    render() {
        const {lists} = this.state
        return (
            <Fragment>
                <List
                    className="List"
                    height={150}
                    itemCount={lists.length}
                    itemSize={(index) => index % 2 ? 50 : 35}
                    ref={this.listRef}
                    width={300}
                >
                    {this.rowContent()}
                </List>
                <div style={{marginTop: '10px'}}>
                    <button onClick={this.handleSubmit}>提交</button>
                    <button onClick={this.handleClear}>清空</button>
                </div>
            </Fragment>
        );
    }
}

export default Scroll
