const m = require('mithril')
const CommingSoonView = {
  view: function () {
    return (
      <div class='comming-soon'>
        <div class='soonClock' />
        <div>
            Coming soon
        </div>
        <div>
            This feature is currently in development and will be available soon
        </div>
      </div>
    )
  }
}

export default CommingSoonView

