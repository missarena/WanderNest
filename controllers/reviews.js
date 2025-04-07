const Listing=require("../Models/listing");
const Review=require("../Models/review");
module.exports.createReview=async(req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
    newReview.author=req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    //console.log("new review saved");
    //res.send("new review saved");
    req.flash("success","New review created!");
    res.redirect(`/listings/${req.params.id}`);
};

module.exports.destroyReview=async(req,res)=>{
    let{id,reviewId}=req.params;

     await Listing.findByIdAndUpdate(id,{$pull: {reviews : reviewId}});
     await Review.findByIdAndDelete(reviewId);
     
     req.flash("success"," Review Deleted!");
     res.redirect(`/listings/${id}`);
};