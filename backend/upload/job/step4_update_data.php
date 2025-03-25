use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

//Table structure for table `jobs`
if(!Schema::hasTable('jobs'))
{
    Schema::create('jobs', function (Blueprint $table) {
        $table->id();
        $table->integer('user_id')->nullable();
        $table->integer('category_id')->nullable();
        $table->string('company', 255)->nullable();
        $table->string('title', 255)->nullable();
        $table->string('starting_salary_range', 255)->nullable();
        $table->string('ending_salary_range', 255)->nullable();
        $table->string('type', 255)->nullable();
        $table->string('location', 255)->nullable();
        $table->longtext('description')->nullable();
        $table->string('thumbnail', 255)->nullable();
        $table->string('banner', 255)->nullable();
        $table->string('status', 255)->nullable();
        $table->integer('is_published')->nullable();
        $table->timestamp('start_date')->nullable()->default(now());
        $table->timestamp('end_date')->nullable()->default(now());
        $table->string('paid_amount', 255)->nullable();
        $table->timestamp('created_at')->nullable();
        $table->timestamp('updated_at')->nullable();
    });
}

//Table structure for table `job_applys`
if(!Schema::hasTable('job_applys'))
{
    Schema::create('job_applys', function (Blueprint $table) {
        $table->id();
        $table->integer('user_id');
        $table->integer('job_id');
        $table->string('email', 255)->nullable();
        $table->integer('owner_id');
        $table->string('phone', 255)->nullable();
        $table->string('attachment', 255)->nullable();
        $table->timestamp('created_at')->nullable();
        $table->timestamp('updated_at')->nullable();
    });
}

//Table structure for table `job_categories`
if(!Schema::hasTable('job_categories'))
{
    Schema::create('job_categories', function (Blueprint $table) {
        $table->id();
        $table->string('name', 255)->nullable();
        $table->timestamp('created_at')->nullable();
        $table->timestamp('updated_at')->nullable();
    });
}

//Table structure for table `job_wishlists`
if(!Schema::hasTable('job_wishlists'))
{
    Schema::create('job_wishlists', function (Blueprint $table) {
        $table->id();
        $table->integer('user_id');
        $table->integer('job_id');
        $table->timestamp('created_at')->nullable();
        $table->timestamp('updated_at')->nullable();
    });
}
