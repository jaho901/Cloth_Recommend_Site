package com.ssafy.mongodb.entity;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.persistence.Id;
import java.util.List;

@Data
@Document("user_ssafit")
public class UserTop {

    @Id
    private ObjectId id;

    @Field
    private Number userId = 0;

    private String userName;


    @Field
    private Number largecategory = 0;

    @Field
    private Number userMale = 0;
    @Field
    private Number userFemale = 0;
    @Field
    private Number userHeight = 0;
    @Field
    private Number userWeight = 0;

    @Field
    private Number size = 0;
    @Field
    private Number bright = 0;
    @Field
    private Number color = 0;
    @Field
    private Number thickness = 0;
    @Field
    private Number weightness = 0;
    @Field
    private Number touch = 0;

    @Field
    private Number smallCategoryHalfshort = 0;
    @Field
    private Number smallCategoryShirt = 0;
    @Field
    private Number smallCategoryCollar = 0;
    @Field
    private Number smallCategoryHoody = 0;
    @Field
    private Number smallCategorySweatshirt = 0;
    @Field
    private Number smallCategoryKnit = 0;
    @Field
    private Number smallCategoryLong = 0;
    @Field
    private Number smallCategoryShort = 0;
    @Field
    private Number smallCategoryOthers = 0;

    @Field
    private Number colorWhite = 0;
    @Field
    private Number colorGrey = 0;
    @Field
    private Number colorBlack = 0;
    @Field
    private Number colorRed = 0;
    @Field
    private Number colorPink = 0;
    @Field
    private Number colorOrange = 0;
    @Field
    private Number colorIvory = 0;
    @Field
    private Number colorYellow = 0;
    @Field
    private Number colorGreen = 0;
    @Field
    private Number colorBlue = 0;
    @Field
    private Number colorPurple = 0;
    @Field
    private Number colorBrown = 0;
    @Field
    private Number colorBeige = 0;
    @Field
    private Number colorJean = 0;
    @Field
    private Number colorPattern = 0;

    @Field
    private Number viewCnt = 0;

    @Field
    private Number colorOthers = 0;

    private List<Number> recentItems;

}