import { useNode } from '@craftjs/core'
import { useEffect,useState } from 'react'
import ContentEditable from 'react-contenteditable'

export const Text = ({text, fontSize, textAlign, ...props}) => {
  const { connectors: {connect, drag}, selected, actions: {setProp} } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged
  }))

  const [editable, setEditable] = useState(false)

  useEffect(() => {
    if(selected) {
      return
    }

    setEditable(false)
  }, [selected])

  return (
    <div
      {...props}
      ref={(ref) => connect(drag(ref))}
      onClick={() => selected && setEditable(true)}
    >
      <ContentEditable
        html={text}
        disabled={!editable}
        onChange={(e) =>
          setProp(
            (props) =>
              (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, '')),
            500
          )
        }
        tagName="p"
        style={{ fontSize: `${fontSize}px`, textAlign }}
      />
    </div>
  )
}
