/**
 * connect4 API.
 * Documentation of our connect4 API.
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface AddTokenResponseBody { 
    AddedCell: number;
    Column: number;
    CurrentPlayer: number;
    IsGridFull: boolean;
    Line: number;
    NextPlayer: number;
    PlayerWon: boolean;
}

