"use client";

import React from "react";
import { Rating as SimpleRating, RatingProps } from "react-simple-star-rating";

const Rating: React.FC<RatingProps> = (props) => {
  return <SimpleRating {...props} />;
};

export default Rating;
