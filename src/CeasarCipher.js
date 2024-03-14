import {appendScript} from 'utils/appendScript'
import {removeScript} from 'utils/removeScript'
class CeasarCipher extends React.Component {
    componentDidMount () {
        appendScript("crypto.js");
    }
    componentWillUnmount () {
        removeScript("crypto.js")
    }
}