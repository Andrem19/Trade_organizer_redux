import React, {useEffect} from 'react'
import { connect } from 'react-redux';


const Dashboard = ({syncPosts}) => {

  

    return (
      <div>
        <div>
          <ul>
            {syncPosts.map((post) => (
              <tr key={post.id}>
                <li>{post.name}</li>
                <li>{post.amount}</li>
              </tr>
            ))}
          </ul>
        </div>
      </div>
    )
}
const mapStateToProps = state => {
  return {
    syncPosts: state.posts.posts
  }
}

export default connect(mapStateToProps, null)(Dashboard)
