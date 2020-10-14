import React, { useState } from 'react'
import { VariableSizeList } from 'react-window';

/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 * 
 * @param {String} text The text to be rendered.
 * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
 * 
 * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
 */
function getTextWidth(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}

// 计算文本高度
function calcTextHeight(text, font) {
    const width = getTextWidth(text, font)
    return Math.ceil(width / (300 - 15)) * 30
}

function List(props) {
    const { lists } = props
    return (
        <VariableSizeList
            height={300}
            width={300}
            itemCount={lists.length}
            itemSize={(index) => calcTextHeight(lists[index], 'normal 16px PingFang SC')}
        >
            {({ index, style }) => (
                <div style={style}>
                    <p style={{ margin: '0', padding: '0 15px 0 0', wordBreak: 'break-word' }}>{lists[index]}</p>
                </div>
            )}
        </VariableSizeList>
    )
}

function Input(props) {
    const [text, setText] = useState('')
    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handleSubmit = () => {
        setText('')
        props.submit(text)
    }
    return (<div>
        <input type="text" value={text} onChange={handleChange}/>
        <button onClick={handleSubmit}>提交</button>
    </div>)
}

class Body extends React.Component {
    listRef = React.createRef();

    constructor(props) {
        super(props)
        this.state = {
            lists: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }
    }

    Submit = (v) => {
        console.log(v)
    }

    render() {
        return (<main>
            <List ref={this.listRef} lists={this.state.lists} />
            <Input submit={this.Submit} />
        </main>)
    }
}

export default Body

// export default function Body() {
//     const [lists, setLists] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
//     const listRef = useRef(null) // React.createRef()

//     const Submit = (v) => {
//         setLists([...lists, v])
//         console.log('Submit -> listRef', listRef)
//     }

//     return (<main>
//         <List ref={listRef} lists={lists} />
//         <Input submit={Submit} />
//     </main>)
// }