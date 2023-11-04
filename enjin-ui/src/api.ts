class API {
  uri: string

  constructor(uri: string) {
    this.uri = uri
  }

  async getForums() {
    return await fetch(`${this.uri}/forums`)
      .then(data => data.json())
  }

  async getThreads(forumId: string) {
    return await fetch(`${this.uri}/threads/${forumId}`)
      .then(data => data.json())
  }

  async getPosts(threadId: string) {
    return await fetch(`${this.uri}/posts/${threadId}`)
      .then(data => data.json())
  }
}

export default API