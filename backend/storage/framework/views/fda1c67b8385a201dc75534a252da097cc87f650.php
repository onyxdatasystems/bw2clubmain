<style>
.dAdmin_info_name .btns {
	height: 20px;
	display: inline-block;
	width: 60px;
	text-align: center;
	text-transform: capitalize;
	border-radius: 5px;
	font-size: 10px;
	color: #fff !important;
	line-height: 20px;
}
    .dAdmin_info_name .btns:focus{
      box-shadow: none !important;
    }
    </style>
  <div class="main_content">
      <!-- Mani section header and breadcrumb -->
      <div class="mainSection-title">
        <div class="row">
          <div class="col-12">
            <div class="d-flex justify-content-between align-items-center flex-wrap gr-15">
              <div class="d-flex flex-column">
                 <h4><?php echo e(get_phrase('All Pending Jobs')); ?></h4>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Start Admin area -->
      <div class="row">
        <div class="col-12">
          <div class="eSection-wrap-2">
            <!-- Filter area -->
            <div class="table-responsive">
              <table class="table eTable " id="">
                <thead>
                  <tr>
                    <th scope="col"><?php echo e(get_phrase('ID')); ?></th>
                    <th scope="col"><?php echo e(get_phrase('Title')); ?></th>
                    <th scope="col"><?php echo e(get_phrase('Company')); ?></th>
                    <th scope="col"><?php echo e(get_phrase('Date')); ?></th>
                    <th scope="col"><?php echo e(get_phrase('Status')); ?></th>
                    <th scope="col"><?php echo e(get_phrase('Payment')); ?></th>
                    <th scope="col" class="text-center"><?php echo e(get_phrase('Action')); ?></th>
                  </tr>
                </thead>
                <tbody>
                  <?php $__currentLoopData = $pending_job; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $key => $job): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                         
                      <tr>
                          <th scope="row">
                            <p class="row-number"><?php echo e(++ $key); ?></p>
                          </th>
                          <td>
                            <div class="dAdmin_info_name min-w-100px">
                                <a href="<?php echo e(route('job.single.details', $job->id)); ?>" target="_blank" class="text-dark"><?php echo e($job->title); ?></a>
                            </div>
                          </td>
                          <td scope="row">
                             <div class="dAdmin_info_name min-w-100px">
                              <p><?php echo e($job->company); ?></p>
                          </div>
                        </td>
                          <td>
                            <div class="dAdmin_info_name min-w-100px">
                                <p><?php echo e(date( "d-m-y", strtotime($job->created_at))); ?></p>
                            </div>
                          </td>
                          <td>
                            <div class="dAdmin_info_name min-w-100px m-auto d-flex">
                              <?php if($job->status == '0'): ?>
                                <p class="text-dark btns btn-danger"><?php echo e(get_phrase('Pending')); ?></p>
                              <?php endif; ?>
                            </div>
                          </td>
                          <td>
                            <div class="dAdmin_info_name min-w-100px m-auto d-flex">
                              <?php if($job && $job->is_published == '1'): ?>
                                <p class="text-dark btns btn-info"><?php echo e(get_phrase('Paid')); ?></p>
                                <?php else: ?>
                                <p class="text-dark btns btn-danger"><?php echo e(get_phrase('Not Paid')); ?></p>
                              <?php endif; ?>
                            </div>
                          </td>

                          
                          <td class="text-center">
                            <div class="adminTable-action">
                              <button type="button" class="eBtn eBtn-black dropdown-toggle table-action-btn-2" data-bs-toggle="dropdown" aria-expanded="false">
                                <?php echo e(get_phrase('Actions')); ?>

                              </button>
                              <ul class="dropdown-menu dropdown-menu-end eDropdown-menu-2 eDropdown-table-action">
                                <li><a class="dropdown-item" href="<?php echo e(route('admin.job.edit',$job->id)); ?>"><?php echo e(get_phrase('Edit')); ?></a></li>
                                <li><a class="dropdown-item" onclick="return confirm('<?php echo e(get_phrase('Are You Sure Want To Delete?')); ?>')"  href="<?php echo e(route('admin.delete.job', $job->id)); ?>"><?php echo e(get_phrase('Delete')); ?></a></li>
                              </ul>
                            </div>
                          </td>
                      </tr>
                   <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>   
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <!-- End Admin area -->
  
     
      <!-- Start Footer -->
      <?php echo $__env->make('backend.footer', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
      <!-- End Footer -->
    </div>
  
  
  
  <?php /**PATH /home/hospitalpicks/public_html/bwclub.hospitalpicks.com/resources/views/backend/admin/jobs/pending_job.blade.php ENDPATH**/ ?>