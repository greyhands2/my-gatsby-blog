import React from 'react'
import {graphql} from 'gatsby'
import Layout from '../components/layout'

export default ({data}) => {
    const post = data.markdownRemark;

    return (
        <Layout>
            <div>
                <h1>{post.frontmatter.title}</h1>
                
                {/** it is called dangerouslySetInnerHTML because it is unsafe to use in normal react but in gatsby it's ok to use since it's statically and not dynamically set */}
                <div dangerouslySetInnerHTML={{ __html: post.html  }}/>
            </div>
        </Layout>
    )
}

export const query = graphql`

    query($slug: String!){
        markdownRemark(fields: {slug: {eq: $slug}}){
            html
            frontmatter {
                title
            }
        }
    }

`
