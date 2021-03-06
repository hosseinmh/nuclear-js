/**
 * This file is provided by Facebook for testing and evaluation purposes
 * only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var MessageComposer = require('./MessageComposer.jsx')
var MessageListItem = require('./MessageListItem.jsx')
var Chat = require('../modules/chat')
var React = require('react')
var NuclearMixin = require('nuclear-js-react-addons/nuclearMixin')

var MessageSection = React.createClass({
  mixins: [NuclearMixin],

  getDataBindings() {
    return {
      thread: Chat.getters.currentThread,
    }
  },

  componentDidMount: function() {
    this._scrollToBottom()
  },

  render: function() {
    var thread = this.state.thread
    var messageListItems = thread.get('messages').map(message => {
      return (
        <MessageListItem
          key={message.get('id')}
          message={message}
        />
      )
    })

    return (
      <div className="message-section">
        <h3 className="message-thread-heading">{thread.get('threadName')}</h3>
        <ul className="message-list" ref="messageList">
          {messageListItems}
        </ul>
        <MessageComposer threadID={thread.get('threadID')}/>
      </div>
    )
  },

  componentDidUpdate: function() {
    this._scrollToBottom()
  },

  _scrollToBottom: function() {
    var ul = this.refs.messageList.getDOMNode()
    ul.scrollTop = ul.scrollHeight
  },
})

module.exports = MessageSection
