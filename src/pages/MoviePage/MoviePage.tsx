import { useContext } from "react";
import { TemplatePage } from "../../components/TemplatePage/TemplatePage";
import { MoviesContext } from "../../providers/MoviesContext/MoviesContext";
import styles from "./styles.module.scss";
import { FiStar } from "react-icons/fi";
import { ReviewsList } from "../../components/ReviewsList/ReviewsList";
import EmptyAnimation from "../../assets/icons/empty-animation.gif";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { CreateReviewModal } from "../../components/modals/CreateReviewModal/CreateReviewModal";
import { DeleteReviewModal } from "../../components/modals/DeleteReviewModal/DeleteReviewModal";
import { EditReviewModal } from "../../components/modals/EditReviewModal/EditReviewModal";
import { toast } from "react-toastify";

export const MoviePage = () => {
  const {
    movieData,
    averageReview,
    isCreateModalOpen,
    setIsCreateModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    myReview,
    hasUserRating,
    findUserReview,
  } = useContext(MoviesContext);

  const myReviewObj = { ...myReview() };

  const token = localStorage.getItem("@Kenzie-Movie:user-token");

  return (
    <TemplatePage>
      <section className={`${styles.imageSection}`}>
        <img src={movieData?.image} alt="Movie's image" />
        <div className={styles.infoContainer}>
          <div className={styles.textBox}>
            <span className="tag">{movieData?.type}</span>
            <h3 className="title3">{movieData?.name}</h3>
          </div>
          <div className={styles.rateBox}>
            <p className="text">{movieData?.duration}m</p>
            <div className={styles.ratingBox}>
              <FiStar size={24} />
              <span className="text">
                {averageReview(movieData) === "Be the first to rate!"
                  ? averageReview(movieData)
                  : String(averageReview(movieData) + "/10")}
              </span>
            </div>
          </div>
        </div>
      </section>

      <main className={`${styles.main} container`}>
        <section className={`${styles.synopsisText}`}>
          <p className="text">{movieData?.synopsis}</p>
        </section>

        <section>
          {/* Reviews Section in case there is no review */}
          <div className={`${styles.ratingUserBox}`}>
            <h1 className="title1">Reviews</h1>
            {!hasUserRating() ? (
              <button
                onClick={() => {
                  {
                    !token
                      ? toast.warn("Only logged users can make reviews!")
                      : setIsCreateModalOpen(true);
                  }
                }}
                className={`${styles.ratingButton} btn-md`}
              >
                <FiStar />
                Rate
              </button>
            ) : null}
          </div>

          {hasUserRating() ? (
            <>
              <h3 className="title3">Your Review</h3>
              <div className={`${styles.yourRating}`}>
                <p className="text">"{myReview()?.description}"</p>
                <div>
                  <div className={`${styles.ratingBox}`}>
                    <FiStar size={21} />
                    <p className="text">{myReview()?.score}/10</p>
                  </div>
                  <button
                    onClick={() => {
                      myReviewObj ? setIsEditModalOpen(myReview()) : null;
                    }}
                  >
                    <FiEdit2 size={24} />
                  </button>
                  <button
                    onClick={() => {
                      setIsDeleteModalOpen(myReview()?.id);
                    }}
                  >
                    <FiTrash2 size={24} />
                  </button>
                </div>
              </div>
            </>
          ) : null}
          <div>
            {movieData?.reviews.length === 0 ? (
              <div className={`${styles.noReviewBox}`}>
                <h3 className="title3">No reviews on our database...</h3>
                <img
                  src={EmptyAnimation}
                  alt="Emoticon face looking for something."
                />
              </div>
            ) : (
              <ReviewsList findUserReview={findUserReview} />
            )}
          </div>
        </section>
      </main>
      {isCreateModalOpen ? <CreateReviewModal /> : null}
      {isDeleteModalOpen ? <DeleteReviewModal /> : null}
      {isEditModalOpen ? <EditReviewModal /> : null}
    </TemplatePage>
  );
};
