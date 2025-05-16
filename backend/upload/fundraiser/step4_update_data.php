use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

if (!Schema::hasColumn('invites', 'fundraiser_id')) {
    Schema::table('invites', function (Blueprint $table) {
       $table->integer('fundraiser_id')->nullable();
    });
}

if (!Schema::hasColumn('notifications', 'fundraiser_id')) {
    Schema::table('notifications', function (Blueprint $table) {
    $table->integer('fundraiser_id')->nullable();
    });
}

if (!Schema::hasColumn('shares', 'fundraiser_id')) {
    Schema::table('shares', function (Blueprint $table) {
    $table->integer('fundraiser_id')->nullable();
    });
}


//Table structure for table `fundraisers`
if(!Schema::hasTable('fundraisers'))
{
    Schema::create('fundraisers', function (Blueprint $table) {
        $table->id();
        $table->integer('categories_id')->nullable();
        $table->integer('goal_amount')->nullable();
        $table->string('title', 255)->nullable();
        $table->longtext('description')->nullable();
        $table->timestamp('timestamp_end')->nullable();
        $table->integer('raised_amount')->nullable();
        $table->integer('status')->nullable();
        $table->integer('share')->nullable();
        $table->longtext('invited')->nullable();
        $table->integer('user_id')->nullable();
        $table->string('cover_photo', 255)->nullable();
        $table->timestamp('created_at')->nullable();
        $table->timestamp('updated_at')->nullable();
    });
}

//Table structure for table `fundraiser_categories`
if(!Schema::hasTable('fundraiser_categories'))
{
    Schema::create('fundraiser_categories', function (Blueprint $table) {
        $table->id();
        $table->text('name');
        $table->string('image' , 255);
        $table->timestamp('create_at')->nullable();
    });
}

if(DB::table('fundraiser_categories')->where('name', 'Popular')->count() == 0){
    DB::table('fundraiser_categories')->insert(['name' => 'Popular', 'image' => '', 'create_at' => date('Y-m-d H:i:s')]);
}

if(DB::table('fundraiser_categories')->where('name', 'Animals')->count() == 0){
    DB::table('fundraiser_categories')->insert(['name' => 'Animals', 'image' => '', 'create_at' => date('Y-m-d H:i:s')]);
}

if(DB::table('fundraiser_categories')->where('name', 'Arts and Culture')->count() == 0){
    DB::table('fundraiser_categories')->insert(['name' => 'Arts and Culture', 'image' => '', 'create_at' => date('Y-m-d H:i:s')]);
}
if(DB::table('fundraiser_categories')->where('name', 'Business')->count() == 0){
    DB::table('fundraiser_categories')->insert(['name' => 'Business', 'image' => '', 'create_at' => date('Y-m-d H:i:s')]);
}
if(DB::table('fundraiser_categories')->where('name', 'Community & social action')->count() == 0){
    DB::table('fundraiser_categories')->insert(['name' => 'Community & social action', 'image' => '', 'create_at' => date('Y-m-d H:i:s')]);
}
if(DB::table('fundraiser_categories')->where('name', 'Crisis relief')->count() == 0){
    DB::table('fundraiser_categories')->insert(['name' => 'Crisis relief', 'image' => '', 'create_at' => date('Y-m-d H:i:s')]);
}
if(DB::table('fundraiser_categories')->where('name', 'Education')->count() == 0){
    DB::table('fundraiser_categories')->insert(['name' => 'Education', 'image' => '', 'create_at' => date('Y-m-d H:i:s')]);
}



//Table structure for table `fundraiser_donations`
if(!Schema::hasTable('fundraiser_donations'))
{
    Schema::create('fundraiser_donations', function (Blueprint $table) {
        $table->id();
        $table->integer('fundraiser_id')->nullable();
        $table->integer('doner_id')->nullable();
        $table->integer('user_id')->nullable();
        $table->integer('amount')->nullable();
        $table->string('payment_getway' , 255)->nullable();
        $table->timestamp('created_at')->nullable();
        $table->timestamp('updated_at')->nullable();
    });
}



//Table structure for table `fundraiser_payouts`
if(!Schema::hasTable('fundraiser_payouts'))
{
    Schema::create('fundraiser_payouts', function (Blueprint $table) {
        $table->id();
        $table->integer('user_id')->nullable();
        $table->integer('requested_amount')->nullable();
        $table->datetime('issue_date')->nullable();
        $table->datetime('received_date')->nullable();
        $table->string('payment_method',255)->nullable();
        $table->integer('status')->nullable();
        $table->timestamp('created_at')->nullable();
        $table->timestamp('updated_at')->nullable();
    });
}


