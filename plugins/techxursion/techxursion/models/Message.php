<?php namespace Techxursion\Techxursion\Models;

use Model;

/**
 * Model
 */
class Message extends Model
{
    use \Winter\Storm\Database\Traits\Validation;
    
    /*
     * Disable timestamps by default.
     * Remove this line if timestamps are defined in the database table.
     */
    public $timestamps = false;


    /**
     * @var string The database table used by the model.
     */
    public $table = 'techxursion_techxursion_messages';
    public $belongsTo = ["user"=>\Winter\User\Models\User::class];
    /**
     * @var array Validation rules
     */
    public $rules = [
    ];
}
