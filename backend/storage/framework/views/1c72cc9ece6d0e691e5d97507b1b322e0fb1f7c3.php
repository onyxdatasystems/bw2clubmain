<div class="row g-0">
    <div class="col-12 px-3">
        <div class="eSection-wrap-2 d-flex justify-content-between mt-3">

            <div class="d-flex align-items-center">
                <div class="title">
                    <i class="fa-solid fa-puzzle-piece text-black"></i>
                    <span class="text-black">Addon manager</span>
                </div>
            </div>

            
            <a href="javascript:void(0)"
                onclick="ajaxModal('<?php echo e(route('load_modal_content', ['view_path' => 'backend.admin.addons.install_form'])); ?>', '<?php echo e(get_phrase('Install addon')); ?>', 'modal-md');"
                data-bs-toggle="modal" class="btn btn-primary btn-sm py-2" id="addon-install-btn">
                <i class="fa fa-plus-circle m-0 me-1"></i>
                <div class="d-none d-md-inline-block"><?php echo e(get_phrase('Install addon')); ?></div>
            </a>
        </div>

        <div class="eSection-wrap-2 mt-3">
            <div class="table-responsive">
                <table class="table eTable " id="">
                    <thead>
                        <tr>
                            <th scope="col"><?php echo e(get_phrase('Sl No')); ?></th>
                            <th scope="col"><?php echo e(get_phrase('Name')); ?></th>
                            <th scope="col"><?php echo e(get_phrase('Version')); ?></th>
                            <th scope="col"><?php echo e(get_phrase('Status')); ?></th>
                            <th scope="col" class="text-center"><?php echo e(get_phrase('Action')); ?></th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php $__currentLoopData = $addons; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $key => $addon): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                            <tr>
                                <th scope="row">
                                    <p class="row-number"><?php echo e(++$key); ?></p>
                                </th>
                                <td>
                                    <div class="dAdmin_info_name min-w-100px">
                                        <span><?php echo e($addon->title); ?></span>
                                    </div>
                                </td>
                                <td>
                                    <div class="dAdmin_info_name min-w-100px">
                                        <span><?php echo e($addon->version); ?></span>
                                    </div>
                                </td>
                                <td>
                                    <div class="dAdmin_info_name min-w-100px">
                                        <?php if($addon->status == 1): ?>
                                            <span class="badge rounded-pill bg-success">Active</span>
                                        <?php else: ?>
                                            <span class="badge rounded-pill bg-danger">Deactivated</span>
                                        <?php endif; ?>
                                    </div>
                                </td>


                                <td class="text-center">
                                    <div class="d-flex justify-content-center">
                                        <div class="adminTable-action m-0 d-flex justify-content-center">
                                            <button type="button"
                                                class="eBtn eBtn-black dropdown-toggle table-action-btn-2"
                                                data-bs-toggle="dropdown" aria-expanded="false">
                                                <?php echo e(get_phrase('Actions')); ?>

                                            </button>
                                            <ul
                                                class="dropdown-menu dropdown-menu-end eDropdown-menu-2 eDropdown-table-action">
                                                <?php if($addon->status == 1): ?>
                                                    <li><a class="dropdown-item"
                                                            href="<?php echo e(route('addon.status', ['status' => 'deactivate', 'id' => $addon->id])); ?>"><?php echo e(get_phrase('Deactivate')); ?></a>
                                                    </li>
                                                <?php else: ?>
                                                    <li><a class="dropdown-item"
                                                            href="<?php echo e(route('addon.status', ['status' => 'activate', 'id' => $addon->id])); ?>"><?php echo e(get_phrase('Activate')); ?></a>
                                                    </li>
                                                <?php endif; ?>
                                                <li><a class="dropdown-item"
                                                        onclick="return confirm('<?php echo e(get_phrase('Are You Sure Want To Delete?')); ?>')"
                                                        href="<?php echo e(route('addon.delete', $addon->id)); ?>"><?php echo e(get_phrase('Delete')); ?></a>
                                                </li>
                                            </ul>
                                        </div>
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


<script>
    $(document).ready(function() {
        $('#addon_manager').click(function(e) {
            e.preventDefault();
            $('.addon_manager_dropdown').toggleClass('d-none');
        });
    });
</script>
<?php echo $__env->make('frontend.common_scripts', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
<?php /**PATH /home/hospitalpicks/public_html/bwclub.hospitalpicks.com/resources/views/backend/admin/addons/index.blade.php ENDPATH**/ ?>