// application
import Pagination from '../shared/Pagination';
import Rating from '../shared/Rating';

// data stubs


function ProductTabReviews() {


    return (
        <div className="reviews-view">
            <div className="reviews-view__list">
                <h3 className="reviews-view__header">Customer Reviews</h3>

                <div className="reviews-list">
                    <ol className="reviews-list__content">
                    </ol>
                    <div className="reviews-list__pagination">
                        <Pagination current={1} siblings={2} total={10} />
                    </div>
                </div>
            </div>

            <form className="reviews-view__form">
                <h3 className="reviews-view__header">Write A Review</h3>
                <div className="row">
                    <div className="col-12 col-lg-9 col-xl-8">
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label htmlFor="review-stars">Review Stars</label>
                                <select id="review-stars" className="form-control">
                                    <option>5 Stars Rating</option>
                                    <option>4 Stars Rating</option>
                                    <option>3 Stars Rating</option>
                                    <option>2 Stars Rating</option>
                                    <option>1 Stars Rating</option>
                                </select>
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="review-author">Your Name</label>
                                <input type="text" className="form-control" id="review-author" placeholder="Your Name" />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="review-email">Email Address</label>
                                <input type="text" className="form-control" id="review-email" placeholder="Email Address" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="review-text">Your Review</label>
                            <textarea className="form-control" id="review-text" rows={6} />
                        </div>
                        <div className="form-group mb-0">
                            <button type="submit" className="btn btn-primary btn-lg">Post Your Review</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ProductTabReviews;
