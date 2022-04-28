import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { updateProduct } from "../../productsSlice"
import ProductAttributesForm from "./components/form"

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: state.products.editProduct,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: values => {
      dispatch(
        updateProduct({
          id: values.id,
          attributes: values.attributes,
        })
      )
    },
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductAttributesForm)
)
