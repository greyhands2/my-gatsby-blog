/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

//note code here is gatsby node api based
//note gatsby likes to use back ticks `` instead of single or double quotes '' or ""

const path = require('path')
const {createFilePath} = require(`gatsby-source-filesystem`)


exports.onCreateNode = ({node, getNode, actions}) =>{
    const {createNodeField} = actions
    if(node.internal.type===`MarkdownRemark`){
        const slug = createFilePath({node, getNode})
        // adding a new field called slug into our graphql query
        createNodeField({
            node,
            name: `slug`,
            value: slug
        })
    }
}


exports.createPages= ({graphql, actions}) => {
    const {createPage} = actions
    //in the frontend we get to use es6 graphql`` but here we do not get direct access to es6 so we use graphql(``)
    return graphql(`
        {
            allMarkdownRemark {
                edges {
                    node {
                        fields {
                            slug
                        }
                    }
                }
            }
        }

    `).then(result=>{
        result.data.allMarkdownRemark.edges.forEach(({node})=>{
            createPage({
                path: node.fields.slug,
                component: path.resolve(`./src/templates/blog-post.js`),
                context:{
                    slug: node.fields.slug
                }
            })
        })
    })
}

